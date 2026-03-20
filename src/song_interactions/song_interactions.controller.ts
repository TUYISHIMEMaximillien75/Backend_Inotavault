import { Controller, Get, Post, Body, Patch, Param, Delete, Ip } from '@nestjs/common';
import { SongInteractionsService } from './song_interactions.service';
import { CreateSongInteractionDto } from './dto/create-song_interaction.dto';
import { UpdateSongInteractionDto } from './dto/update-song_interaction.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('song-interactions')
export class SongInteractionsController {
  constructor(private readonly songInteractionsService: SongInteractionsService) { }

  @Public()
  @Post()
  create(@Body() createSongInteractionDto: CreateSongInteractionDto, @Ip() ip_address: string, @CurrentUser() user?: User) {
    return this.songInteractionsService.create(createSongInteractionDto,ip_address,user);
  }

  @Get()
  findAll() {
    return this.songInteractionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songInteractionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongInteractionDto: UpdateSongInteractionDto) {
    return this.songInteractionsService.update(+id, updateSongInteractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songInteractionsService.remove(+id);
  }
}
