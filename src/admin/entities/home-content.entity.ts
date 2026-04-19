import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface ArtistItem {
  name: string;
  image: string;
  choir: string;
  songs: string[];
  youtube: string;
}

export interface StatItem {
  n: string;
  label: string;
}

@Entity('home_content')
export class HomeContent {
  /** Always 1 — singleton row */
  @PrimaryColumn()
  id: number;

  @Column({ type: 'jsonb', default: '[]' })
  artists: ArtistItem[];

  @Column({ type: 'jsonb', default: '[]' })
  stats: StatItem[];

  @Column({ type: 'jsonb', default: '[]' })
  slideshowImages: string[];
}
