import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string; // The receiver's user ID

  @Column()
  action_by: string; // The name of the person who acted

  @Column()
  song_name: string; // The name of the song acted upon

  @Column()
  type: string; // 'LIKE' | 'COMMENT' | 'SHARE'

  @Column()
  message: string; // Formatted full message

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
