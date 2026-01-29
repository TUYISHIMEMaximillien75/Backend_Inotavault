import { Module } from '@nestjs/common';
import { SongInteractionsService } from './song_interactions.service';
import { SongInteractionsController } from './song_interactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongInteraction } from './entities/song_interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SongInteraction])],
  controllers: [SongInteractionsController],
  providers: [SongInteractionsService],
})
export class SongInteractionsModule {}
