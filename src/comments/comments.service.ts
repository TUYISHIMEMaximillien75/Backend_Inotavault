import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { In, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { SongsService } from '../songs/songs.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly notificationsService: NotificationsService,
    private readonly songsService: SongsService
  ){}
  async create(user: User, createCommentDto: CreateCommentDto) {
    const userId = user.id;
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user_id: userId,
      name: user.name,
    });
    const savedComment = await this.commentRepository.save(comment);

    try {
      const song = await this.songsService.findOne(createCommentDto.song_id);
      if (song) {
        await this.notificationsService.createNotification(
          song.uploader_id,
          user.name,
          song.name,
          'COMMENT',
          `${user.name} commented on your song ${song.name}`
        );
      }
    } catch (err) {
      console.error("Failed to notify user of comment", err);
    }

    return savedComment;
    
  }

  async findAll(song_id: string) {
    return await this.commentRepository.find({
      where:{
        song_id: song_id
      },
      order: {
        id: "ASC"
      }
    });
  }

  async findAllNumber(song_id: string) {
    const count = await this.commentRepository.count({
      where:{
        song_id: song_id
      }
    });

    return count;
  }

  async totalByUploader(songIds: string[]): Promise<number> {
    if (!songIds.length) return 0;
    return this.commentRepository.count({
      where: { song_id: In(songIds) },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
