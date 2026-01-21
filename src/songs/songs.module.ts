import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [TypeOrmModule.forFeature([Song]), UsersModule, CloudinaryModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule { }
