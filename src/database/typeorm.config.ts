import * as dotenv from "dotenv";
dotenv.config(); // MUST BE AT TOP

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Song } from "../songs/entities/song.entity";
import { Comment } from "../comments/entities/comment.entity";
import { Like } from "../likes/entities/like.entity";
import { SongInteraction } from "../song_interactions/entities/song_interaction.entity";
import { Repertoire } from "../repertoire/entities/repertoire.entity";
import { RepertoireSection } from "../repertoire/entities/repertoire-section.entity";
import { RepertoireSong } from "../repertoire/entities/repertoire-song.entity";
import { Notification } from "../notifications/entities/notification.entity";
let typeOrmConfig: TypeOrmModuleOptions;
if (process.env.NODE_ENV === "production") {

  // db hosted for production with db_url
  typeOrmConfig = {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [User, Song, Comment, Like, SongInteraction, Repertoire, RepertoireSection, RepertoireSong, Notification],
    synchronize: true,
  };
} else {
  typeOrmConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, // must be string
    database: process.env.DB_NAME,
    entities: [User, Song, Comment, Like, SongInteraction, Repertoire, RepertoireSection, RepertoireSong, Notification],
    synchronize: true,
    // ssl: false,
  };

}

export { typeOrmConfig }
export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);
