import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async createSong(user: User, createSongDto: CreateSongDto,
    files: {
      pdf_sheet: Express.Multer.File[];
      video_file?: Express.Multer.File[];
      audio_file?: Express.Multer.File[];
      coverImage?: Express.Multer.File[];
    }
  ) {

    const pdf = files.pdf_sheet ? await this.cloudinaryService.uploadFile(files.pdf_sheet[0], "songs/pdf") : null;

    const audio = files.audio_file ? await this.cloudinaryService.uploadFile(files.audio_file[0], "songs/audio") : null;

    const video = files.video_file ? await this.cloudinaryService.uploadFile(files.video_file[0], "songs/video") : null;

    const coverImage = files.coverImage ? await this.cloudinaryService.uploadFile(files.coverImage[0], "songs/covers") : null;

    const uploader_id = user.id;

    const song = this.songRepository.create({
      ...createSongDto,
      uploader_id,
      pdf_sheet: pdf?.url,
      audio_file: audio?.url,
      video_file: video?.url,
      coverImage: coverImage?.url
    });
    return await this.songRepository.save(song);
  }

  findAll(category: string) {

    if(category === "all"){
      return this.songRepository.find();
    }

    const songs = this.songRepository.find({
      where:{
        category: category
      },
       //order randomly
       order: {
        id: "ASC"
       }
    });
    return songs;
  }

  async findOne(id: string) {
    const song = await this.songRepository.findOne({
      where:{
        id: id
      }
    });

    if(!song){
      throw new Error("Song not found");
    }

    const view_count = song.view_count + 1;
    await this.songRepository.update(id, { view_count });
    return song;
  }

  async likeSong(id: string) {
    const song = await this.songRepository.findOne({
      where:{
        id: id
      }
    });

    if(!song){
      throw new Error("Song not found");
    }

    const likes = song.likes + 1;
    await this.songRepository.update(id, { likes });
    return song.likes + 1;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
