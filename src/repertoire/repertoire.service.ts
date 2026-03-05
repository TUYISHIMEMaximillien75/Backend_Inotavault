import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { Repertoire } from './entities/repertoire.entity';
import { RepertoireSection } from './entities/repertoire-section.entity';
import { RepertoireSong } from './entities/repertoire-song.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RepertoireService {
    constructor(
        @InjectRepository(Repertoire)
        private readonly repertoireRepository: Repository<Repertoire>,
        @InjectRepository(RepertoireSection)
        private readonly sectionRepository: Repository<RepertoireSection>,
        @InjectRepository(RepertoireSong)
        private readonly songRepository: Repository<RepertoireSong>,
        private readonly dataSource: DataSource,
    ) { }

    async create(user: User, dto: CreateRepertoireDto): Promise<Repertoire> {
        return this.dataSource.transaction(async (manager) => {
            // 1. Create the repertoire record
            const repertoire = manager.create(Repertoire, {
                title: dto.title,
                event_type: dto.event_type,
                user_id: user.id,
            });
            const savedRepertoire = await manager.save(repertoire);

            // 2. Create sections with their songs
            for (let i = 0; i < dto.sections.length; i++) {
                const sectionDto = dto.sections[i];

                const section = manager.create(RepertoireSection, {
                    name: sectionDto.name,
                    position: sectionDto.position ?? i,
                    repertoire: savedRepertoire,
                });
                const savedSection = await manager.save(section);

                // 3. Create songs for this section
                for (let j = 0; j < sectionDto.songs.length; j++) {
                    const songDto = sectionDto.songs[j];
                    const repoSong = manager.create(RepertoireSong, {
                        title: songDto.title,
                        source: songDto.source,
                        position: songDto.position ?? j,
                        section: savedSection,
                    });
                    if (songDto.song_id) repoSong.song_id = songDto.song_id;
                    if (songDto.file_uri) repoSong.file_uri = songDto.file_uri;
                    await manager.save(repoSong);
                }
            }

            // Return the full repertoire with relations
            const result = await manager.findOne(Repertoire, {
                where: { id: savedRepertoire.id },
                relations: ['sections', 'sections.songs'],
            });
            return result as Repertoire;
        });
    }

    async update(id: string, user: User, dto: CreateRepertoireDto): Promise<Repertoire> {
        return this.dataSource.transaction(async (manager) => {
            // 1. Update top-level fields (verify ownership via user_id)
            await manager.update(Repertoire, { id, user_id: user.id }, {
                title: dto.title,
                event_type: dto.event_type,
            });

            // 2. Delete old sections — onDelete: CASCADE wipes their songs too
            const oldSections = await manager.find(RepertoireSection, {
                where: { repertoire: { id } },
            });
            if (oldSections.length > 0) {
                await manager.remove(oldSections);
            }

            // 3. Re-insert fresh sections + songs
            const savedRepertoire = await manager.findOneOrFail(Repertoire, { where: { id } });
            for (let i = 0; i < dto.sections.length; i++) {
                const sectionDto = dto.sections[i];
                const section = manager.create(RepertoireSection, {
                    name: sectionDto.name,
                    position: sectionDto.position ?? i,
                    repertoire: savedRepertoire,
                });
                const savedSection = await manager.save(section);

                for (let j = 0; j < sectionDto.songs.length; j++) {
                    const songDto = sectionDto.songs[j];
                    const repoSong = manager.create(RepertoireSong, {
                        title: songDto.title,
                        source: songDto.source,
                        position: songDto.position ?? j,
                        section: savedSection,
                    });
                    if (songDto.song_id) repoSong.song_id = songDto.song_id;
                    if (songDto.file_uri) repoSong.file_uri = songDto.file_uri;
                    await manager.save(repoSong);
                }
            }

            const result = await manager.findOne(Repertoire, {
                where: { id },
                relations: ['sections', 'sections.songs'],
            });
            return result as Repertoire;
        });
    }

    async findAllByUser(user: User): Promise<Repertoire[]> {
        return this.repertoireRepository.find({
            where: { user_id: user.id },
            relations: ['sections', 'sections.songs'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string, user: User): Promise<Repertoire | null> {
        return this.repertoireRepository.findOne({
            where: { id, user_id: user.id },
            relations: ['sections', 'sections.songs'],
        });
    }

    async remove(id: string, user: User): Promise<{ message: string }> {
        await this.repertoireRepository.delete({ id, user_id: user.id });
        return { message: 'Repertoire deleted successfully' };
    }
}
