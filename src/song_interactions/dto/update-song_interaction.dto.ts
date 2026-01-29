import { PartialType } from '@nestjs/swagger';
import { CreateSongInteractionDto } from './create-song_interaction.dto';

export class UpdateSongInteractionDto extends PartialType(CreateSongInteractionDto) {}
