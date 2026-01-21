import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ){}
  async create(user: User, createCommentDto: CreateCommentDto) {
    const userId = user.id;
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user_id: userId,
      name: user.name,
    });
    const savedComment = await this.commentRepository.save(comment);

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
