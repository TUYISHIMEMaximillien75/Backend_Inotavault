import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('song_interactions')
export class SongInteraction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    user_id: string;

    @Column('uuid')
    song_id: string;

    @Column()
    action: string;

    @CreateDateColumn()
    created_at: Date;
}
