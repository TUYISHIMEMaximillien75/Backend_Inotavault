import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type { RepertoireSection } from './repertoire-section.entity';

@Entity('repertoire')
export class Repertoire {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    event_type: string;

    @Column()
    user_id: string;

    @OneToMany('RepertoireSection', 'repertoire', {
        cascade: true,
        eager: true,
    })
    sections: RepertoireSection[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
