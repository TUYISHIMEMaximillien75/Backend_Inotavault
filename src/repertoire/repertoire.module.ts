import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repertoire } from './entities/repertoire.entity';
import { RepertoireSection } from './entities/repertoire-section.entity';
import { RepertoireSong } from './entities/repertoire-song.entity';
import { RepertoireService } from './repertoire.service';
import { RepertoireController } from './repertoire.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Repertoire, RepertoireSection, RepertoireSong]),
    ],
    controllers: [RepertoireController],
    providers: [RepertoireService],
})
export class RepertoireModule { }
