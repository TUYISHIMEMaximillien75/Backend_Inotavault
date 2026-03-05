import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Repertoire } from './repertoire.entity';
import { RepertoireSong } from './repertoire-song.entity';

@Entity('repertoire_section')
export class RepertoireSection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    position: number;

    @ManyToOne('Repertoire', 'sections', {
        onDelete: 'CASCADE',
    })
    repertoire: Repertoire;

    @OneToMany('RepertoireSong', 'section', {
        cascade: true,
        eager: true,
    })
    songs: RepertoireSong[];
}
