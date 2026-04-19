import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Song } from '../songs/entities/song.entity';
import { HomeContent, ArtistItem, StatItem } from './entities/home-content.entity';

const DEFAULT_ARTISTS: ArtistItem[] = [
  { name: 'Denys NYITURIKI', image: '/Artists/Denys NYITURIKI.jpg', choir: 'Chorale st Paul KICUKIRO', songs: ['Yezu mwiza, Yezu nshuti yanjye', 'Kwibuka by Rodrigue'], youtube: 'https://www.youtube.com/@DenysNyituriki' },
  { name: 'GACANIZI Bernabe', image: '/Artists/GACANIZI Bernabe ISHIMWE.jpg', choir: 'Chorale le Bon Berger Kigali', songs: ['Kyrie'], youtube: 'https://www.youtube.com/@Gibarna' },
  { name: 'Maximillien TUYISHIME', image: '/Artists/Maximillien TUYISHIME.jpg', choir: 'Chorale Le Bon Berger RAMBURA', songs: ['Ntama zanjye', 'Les amis de la croix'], youtube: 'https://www.youtube.com/@choralelebonbergerrambura9023' },
  { name: 'Oreste NIYONZIMA', image: '/Artists/Oreste NIYONZIMA.jpg', choir: 'Chorale Christus Regnat', songs: ['Nyakira Ndaje', 'Gloria (Imana nisingizwe mu Ijuru)'], youtube: 'https://www.youtube.com/@niyonzimaoreste2436' },
  { name: 'Pacifiques TUNEZERWE', image: '/Artists/Pacifiques TUNEZERWE.jpg', choir: 'Chorale de Kigali', songs: ['Umukiza yatuvukiye', 'Kuko ari igihangage'], youtube: 'https://www.youtube.com/@tunezerwepacifique7906' },
  { name: 'Sadiki Banicet', image: '/Artists/Sadiki B anicet.jpg', choir: 'Chorale de Kigali', songs: ['Uhoraho yambiye ijambo', 'Urukundo ni ubuzima'], youtube: 'https://www.youtube.com/@sadikib' },
];

const DEFAULT_STATS: StatItem[] = [
  { n: '2+', label: 'Choral Communities' },
  { n: '100+', label: 'Music Sheets' },
  { n: '6+', label: 'Featured Artists' },
  { n: '∞', label: 'Possibilities' },
];

const DEFAULT_SLIDESHOW: string[] = [
  '/slideshow pictures/AFRI IMAGE(10).jpg',
  '/slideshow pictures/AFRI IMAGES(204).jpg',
  '/slideshow pictures/AFRI IMAGES(27).jpg',
  '/slideshow pictures/AFRI IMAGES(30).jpg',
  '/slideshow pictures/AFRI IMAGES(300).jpg',
  '/slideshow pictures/AFRI IMAGES(53).jpg',
  '/slideshow pictures/AFRI IMAGES(57).jpg',
  '/slideshow pictures/AFRI IMAGES(58).jpg',
];

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Song)
    private readonly songRepo: Repository<Song>,
    @InjectRepository(HomeContent)
    private readonly homeContentRepo: Repository<HomeContent>,
  ) {}

  /** List all users (no passwords) */
  async getAllUsers() {
    const users = await this.userRepo.find({ order: { createdAt: 'DESC' } });
    return users.map(({ password, ...u }) => u);
  }

  /** Count platform totals */
  async getPlatformStats() {
    const [totalUsers, totalSongs] = await Promise.all([
      this.userRepo.count(),
      this.songRepo.count(),
    ]);
    const cats = await this.songRepo
      .createQueryBuilder('song')
      .select('DISTINCT song.category', 'category')
      .getRawMany();
    return { totalUsers, totalSongs, totalCategories: cats.length };
  }

  /** All songs uploaded by a specific user */
  async getUserSongs(userId: string) {
    return this.songRepo.find({ where: { uploader_id: userId }, order: { createdAt: 'DESC' } });
  }

  /** Admin delete a song */
  async deleteSong(songId: string) {
    const song = await this.songRepo.findOne({ where: { id: songId } });
    if (!song) throw new Error('Song not found');
    await this.songRepo.remove(song);
    return { message: 'Song deleted successfully' };
  }

  /** Update a user's role */
  async updateUserRole(userId: string, role: string) {
    await this.userRepo.update(userId, { role: role as any });
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const { password, ...result } = user;
    return result;
  }

  /** Get home page dynamic content (creates defaults if none yet) + live db stats */
  async getHomeContent() {
    let content = await this.homeContentRepo.findOne({ where: { id: 1 } });
    if (!content) {
      content = this.homeContentRepo.create({
        id: 1,
        artists: DEFAULT_ARTISTS,
        stats: DEFAULT_STATS, // To be deprecated, keeping for backward compatibility
        slideshowImages: DEFAULT_SLIDESHOW,
      });
      await this.homeContentRepo.save(content);
    }

    const [totalUsers, totalSongs] = await Promise.all([
      this.userRepo.count(),
      this.songRepo.count(),
    ]);
    const cats = await this.songRepo
      .createQueryBuilder('song')
      .select('DISTINCT song.category', 'category')
      .getRawMany();

    return {
      ...content,
      liveStats: {
        users: totalUsers,
        songs: totalSongs,
        categories: cats.length,
      }
    };
  }

  /** Replace home page dynamic content */
  async updateHomeContent(data: { artists?: ArtistItem[]; stats?: StatItem[]; slideshowImages?: string[] }) {
    let content = await this.homeContentRepo.findOne({ where: { id: 1 } });
    if (!content) {
      content = this.homeContentRepo.create({ id: 1, artists: DEFAULT_ARTISTS, stats: DEFAULT_STATS, slideshowImages: DEFAULT_SLIDESHOW });
    }
    if (data.artists !== undefined) content.artists = data.artists;
    if (data.stats !== undefined) content.stats = data.stats;
    if (data.slideshowImages !== undefined) content.slideshowImages = data.slideshowImages;
    return this.homeContentRepo.save(content);
  }
}
