import * as dotenv from "dotenv";
dotenv.config(); // MUST BE AT TOP

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Song } from "../songs/entities/song.entity";
import { Comment } from "../comments/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
let typeOrmConfig: TypeOrmModuleOptions;
if (process.env.NODE_ENV === "production") {

  // db hosted for production with db_url
  typeOrmConfig = {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [User, Song, Comment, Like],
    synchronize: true, 
  };
}else{
  typeOrmConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, // must be string
    database: process.env.DB_NAME,
    entities: [User, Song, Comment, Like],
    synchronize: true,
    // ssl: false,
  };
 
}

export {typeOrmConfig}
export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);
