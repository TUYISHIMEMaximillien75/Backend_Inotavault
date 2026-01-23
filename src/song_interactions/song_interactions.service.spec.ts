import { Test, TestingModule } from '@nestjs/testing';
import { SongInteractionsService } from './song_interactions.service';

describe('SongInteractionsService', () => {
  let service: SongInteractionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongInteractionsService],
    }).compile();

    service = module.get<SongInteractionsService>(SongInteractionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
