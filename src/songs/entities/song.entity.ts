import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    uploader_id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    artist: string;

    @Column()
    album: string;

    @Column()
    pdf_sheet: string;

    @Column({
        nullable: true
    })
    video_file: string;

    @Column({
        nullable: true
    })
    audio_file: string;

    @Column({
        nullable: true
    })
    external_link: string;

    @Column({
        nullable: true
    })
    coverImage: string;

    @Column()
    releaseDate: Date;

    @Column({
        default: 0
    })
    likes: number;


    @Column({
        default: 0
    })
    view_count: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


}
