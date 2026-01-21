import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { User } from 'src/users/entities/user.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'artist', 'album', 'category', 'description', 'releaseDate'],
      properties: {

        name: { type: 'string' },
        album: { type: 'string' },
        artist: { type: 'string' },

        category: { type: 'string' },
        description: { type: 'string' },

        releaseDate: { type: 'string', format: 'date' },
        
        pdf_sheet: {
          type: 'file',
          format: 'binary',
        },
        audio_file: {
          type: 'file',
          format: 'binary',
        },
        video_file: {
          type: 'file',
          format: 'binary',
        },
        coverImage: {
          type: 'file',
          format: 'binary',
        },
        external_link: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'pdf_sheet', maxCount: 1 },
        { name: 'video_file', maxCount: 1 },
        { name: 'audio_file', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
      ],
      {
        storage: memoryStorage()
      },
    ),
  )

  uploadSong(@CurrentUser() user: User, @Body() createSongDto: CreateSongDto, @UploadedFiles() files: {
    pdf_sheet: Express.Multer.File[];
    audio_file?: Express.Multer.File[];
    video_file?: Express.Multer.File[];
    coverImage?: Express.Multer.File[];
  } ) {

    return this.songsService.createSong(user, createSongDto, files);
  }

  @Public()
  @Get('/allsong')
  // gettiing page number and limit for pagination 
  async findAll(@Query('category') category: string, @Query('page') page: string, @Query('limit') limit: string) {
    const songs = await this.songsService.findAll(category);
    
    const newPage = parseInt(page);
    const newLimit = parseInt(limit);

    const startIndex= (newPage - 1) * newLimit;
    const endIndex = startIndex + newLimit;

    const paginatedSong = songs.slice(startIndex, endIndex);
    const total = songs.length;

    

    return {paginatedSong, total};
  }

  @Public()
  @Get('song/:id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }
  @Post('like/:id')
  likeSong(@Param('id') id: string) {
    return this.songsService.likeSong(id);
  }

  @Patch('song/:id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
}
