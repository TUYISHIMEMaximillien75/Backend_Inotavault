import { Test, TestingModule } from '@nestjs/testing';
import { SongInteractionsController } from './song_interactions.controller';
import { SongInteractionsService } from './song_interactions.service';

describe('SongInteractionsController', () => {
  let controller: SongInteractionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongInteractionsController],
      providers: [SongInteractionsService],
    }).compile();

    controller = module.get<SongInteractionsController>(SongInteractionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
