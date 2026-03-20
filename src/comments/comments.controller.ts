import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiSecurity('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: User, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(user, createCommentDto);
  }

  @Public()
  @Get('/allComments')
  findAll(@Query('song_id') song_id: string) {
    return this.commentsService.findAll(song_id);
  }

  @Public()
  @Get('/allCommentsNumber')
  findAllNumber(@Query('song_id') song_id: string) {
    return this.commentsService.findAllNumber(song_id);
  }

  @Public()
  @Get('/totalByUploader')
  totalByUploader(@Query('song_ids') song_ids: string) {
    const ids = song_ids ? song_ids.split(',').filter(Boolean) : [];
    return this.commentsService.totalByUploader(ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
