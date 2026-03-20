import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), NotificationsModule, SongsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
