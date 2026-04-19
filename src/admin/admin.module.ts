import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { HomeContent } from './entities/home-content.entity';
import { User } from '../users/entities/user.entity';
import { Song } from '../songs/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeContent, User, Song])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
