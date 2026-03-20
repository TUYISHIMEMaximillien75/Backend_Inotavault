import { Injectable } from '@nestjs/common';
import { CreateSongInteractionDto } from './dto/create-song_interaction.dto';
import { UpdateSongInteractionDto } from './dto/update-song_interaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongInteraction } from './entities/song_interaction.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SongInteractionsService {

  constructor(
    @InjectRepository(SongInteraction)
    private readonly songInteractionsRepository: Repository<SongInteraction>
  ){}

  create(createSongInteractionDto: CreateSongInteractionDto, ip_address:string, user?: User) {
    const user_id = user ? user.id : null;
    const songInteraction = this.songInteractionsRepository.create({
      ...createSongInteractionDto, 
      ip_address, 
      user_id
    });
    return this.songInteractionsRepository.save(songInteraction);
  }

  findAll() {
    return `This action returns all songInteractions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} songInteraction`;
  }

  update(id: number, updateSongInteractionDto: UpdateSongInteractionDto) {
    return `This action updates a #${id} songInteraction`;
  }

  remove(id: number) {
    return `This action removes a #${id} songInteraction`;
  }
}
