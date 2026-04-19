import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    uploader_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 'UPLOADED' })
    category: string;

    @Column({ nullable: true })
    artist: string;

    @Column({ nullable: true, default: "Unknown" })
    album: string;

    /** 'library' = full upload via SongUpload page; 'repertoire' = PDF uploaded inside a repertoire */
    @Column({ default: 'library' })
    upload_source: 'library' | 'repertoire';

    @Column({ nullable: true })
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

    @Column({
        nullable: true
    })
    releaseDate: Date;

    @Column({
        default: 0
    })
    likes: number;


    @Column({
        default: 0
    })
    view_count: number;

    @Column({
        default: 0
    })
    downloads_count: number;
    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


}
