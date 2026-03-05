import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import type { RepertoireSection } from './repertoire-section.entity';

export type SongSource = 'existing' | 'typed' | 'uploaded';

@Entity('repertoire_song')
export class RepertoireSong {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    song_id: string; // FK to songs table — null for typed/uploaded

    @Column()
    title: string; // Always stored for display without joins

    @Column({ type: 'varchar' })
    source: SongSource;

    @Column({ nullable: true })
    file_uri: string; // Cloudinary URL for uploaded songs

    @Column({ default: 0 })
    position: number;

    @ManyToOne('RepertoireSection', 'songs', {
        onDelete: 'CASCADE',
    })
    section: RepertoireSection;
}
