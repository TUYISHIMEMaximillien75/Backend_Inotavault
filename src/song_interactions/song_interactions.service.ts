import { Injectable } from '@nestjs/common';
import { CreateSongInteractionDto } from './dto/create-song_interaction.dto';
import { UpdateSongInteractionDto } from './dto/update-song_interaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongInteraction } from './entities/song_interaction.entity';
@Injectable()
export class SongInteractionsService {

  constructor(
    @InjectRepository(SongInteraction)
    private readonly songInteractionsRepository: Repository<SongInteraction>
  ){}

  create(createSongInteractionDto: CreateSongInteractionDto) {

    const songInteraction = this.songInteractionsRepository.create(createSongInteractionDto);
    return this.songInteractionsRepository.save(songInteraction);

    return 'This action adds a new songInteraction';
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
