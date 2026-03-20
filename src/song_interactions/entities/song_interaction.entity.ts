import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('song_interactions')
export class SongInteraction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    user_id: string | null;

    @Column('uuid')
    song_id: string;
    
    @Column({
        nullable: true
    })
    ip_address: string

    @Column()
    action: string;

    @CreateDateColumn()
    created_at: Date;
}
