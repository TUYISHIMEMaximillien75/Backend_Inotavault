import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { ILike, Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly notificationsService: NotificationsService
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

    const category = createSongDto.category.toUpperCase();
    const song = this.songRepository.create({
      ...createSongDto,
      category,
      uploader_id,
      pdf_sheet: pdf?.url,
      audio_file: audio?.url,
      video_file: video?.url,
      coverImage: coverImage?.url
    });
    const uploadedSong = await this.songRepository.save(song);
    return uploadedSong;
  }

  /**
   * Lightweight upload used inside the repertoire builder.
   * Only a name and a PDF are required; the song is marked as `upload_source='repertoire'`
   * so the uploader can see and edit it later from /dashboard/songs.
   */
  async createSongForRepertoire(
    user: User,
    name: string,
    pdfFile: Express.Multer.File,
  ): Promise<Song> {
    const pdf = await this.cloudinaryService.uploadFile(pdfFile, 'songs/pdf');

    const song = this.songRepository.create({
      name,
      uploader_id: user.id,
      pdf_sheet: pdf.url,
      upload_source: 'repertoire',
      category: 'UPLOADED',
    });
    return this.songRepository.save(song);
  }

  findAll(category: string) {

    if (category === "all") {
      return this.songRepository.find({
        order: {
          createdAt: "DESC"
        }
      });
    }

    const songs = this.songRepository.find({
      where: {
        category: category
      },
      
    });
    return songs;
  }

  async findOne(id: string) {
    const song = await this.songRepository.findOne({
      where: {
        id: id
      }
    });

    if (!song) {
      return null;
    }

    const view_count = song.view_count + 1;
    await this.songRepository.update(id, { view_count });
    return song;
  }

  async likeSong(id: string, user?: User) {
    const song = await this.songRepository.findOne({
      where: {
        id: id
      }
    });

    if (!song) {
      throw new Error("Song not found");
    }

    const likes = song.likes + 1;
    await this.songRepository.update(id, { likes });
    
    // Create notification
    const actionBy = user?.name || "Someone";
    await this.notificationsService.createNotification(
      song.uploader_id,
      actionBy,
      song.name,
      'LIKE',
      `${actionBy} liked your song ${song.name}`
    );

    return song.likes + 1;
  }

  async shareSong(id: string, user?: User) {
    const song = await this.songRepository.findOne({
      where: { id: id }
    });

    if (!song) {
      throw new Error("Song not found");
    }

    const actionBy = user?.name || "Someone";
    await this.notificationsService.createNotification(
      song.uploader_id,
      actionBy,
      song.name,
      'SHARE',
      `${actionBy} shared your song ${song.name}`
    );

    return { message: "Song shared successfully" };
  }

  async findAllCategories() {
    const categories = await this.songRepository.find({
      select: ["category"],

    });

    const uniqueCategories = [...new Set(categories.map((category) => category.category))];
    return { categories: ["all", ...uniqueCategories] };
  }

  //search a song with name or artist or album or category

  async searchSong(query: string) {
    const songs = await this.songRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { artist: ILike(`%${query}%`) },
        { album: ILike(`%${query}%`) },
        { category: ILike(`%${query}%`) },
      ]
    });
    return songs;
  }

  async searchIncategory(query: string, category: string) {

    const category_exixsts = await this.songRepository.findOne({
      where: {
        category: category
      }
    });

    if (category_exixsts) {
      const songs = await this.songRepository.find({
      where: [
        { category: category, name: ILike(`%${query}%`) },
        { category: category, artist: ILike(`%${query}%`) },
        { category: category, album: ILike(`%${query}%`) }
      ]
    });
    return songs;
    }else{
      const songs = await this.songRepository.find({
        where: [
          { name: ILike(`%${query}%`) },
          { artist: ILike(`%${query}%`) },
          { album: ILike(`%${query}%`) }
        ]
      });
      return songs;
    }

   
    // return songs;

  }

  async searchSongInMyLibrary(user: User, query: string) {
    const songs = await this.songRepository.find({
      where: {
        uploader_id: user.id,
        name: ILike(`%${query}%`),
        
      }
    });
    return { songs };
  }

  async getSongsByUploaderId(uploader_id: string) {
    const songs = await this.songRepository.find({
      where: {
        uploader_id: uploader_id
      }
    });


    const uniqueCategories = [...new Set(songs.map((category) => category.category))];
    return { songs, categories: [...uniqueCategories] };

  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const song = await this.songRepository.findOne({ where: { id } });
    if (!song) {
      throw new Error(`Song not found`);
    }
    
    // Convert to uppercase category if it's being updated
    if (updateSongDto.category) {
      updateSongDto.category = updateSongDto.category.toUpperCase();
    }
    
    await this.songRepository.update(id, updateSongDto);
    return this.songRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const song = await this.songRepository.findOne({ where: { id } });
    if (!song) {
      throw new Error(`Song not found`);
    }
    await this.songRepository.remove(song);
    return { message: "Song successfully deleted" };
  }
}
