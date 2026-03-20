import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
// import { CreateLikeDto } from './dto/create-like.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: User, @Query('song_id') song_id: string) {

    return this.likesService.create(user, song_id);
  }
  @Public()
  @Get()
  findAll(@Query('song_id') song_id: string) {
    
    return this.likesService.findAll(song_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
