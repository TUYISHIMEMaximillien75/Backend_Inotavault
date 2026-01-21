import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>
  ){}
  async create(user: User, song_id: string) {
    const user_id = user.id
    const name = user.name
    const likesExist = await this.likesRepository.findOne({
      where:{
        song_id: song_id,
        user_id: user_id
      }
    });
    if(likesExist){
      return 'liked';
    }
  
    const like =  this.likesRepository.create({
      song_id,
      user_id,
      name
    })

    this.likesRepository.save(like)

    const Totallikes = await this.likesRepository.count({
      where:{
        song_id: song_id,
      }
    })

    return Totallikes + 1
    // return 'This action adds a new like';
  }

  findAll(song_id: string) {
    return this.likesRepository.count({
      where:{
        song_id: song_id,
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
