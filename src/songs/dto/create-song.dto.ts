import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDateString } from "class-validator";

export class CreateSongDto {

   @ApiProperty({ example: "Song Name" })
   @IsString()
   name: string;

   @ApiProperty({ example: "Song description" })
   @IsString()
   description: string;

   @ApiProperty({ example: "Gospel" })
   @IsString()
   category: string;

   @ApiProperty({ example: "Artist Name" })
   @IsString()
   artist: string;

   @ApiProperty({ example: "Album Name" })
   @IsString()
   album: string;

   @ApiProperty({ example: "https://youtube.com/..." })
   @IsOptional()
   @IsString()
   external_link?: string;

   @ApiProperty({ example: "2025-01-15" })
   @IsDateString()
   releaseDate: string;

   @IsOptional()
   pdf_sheet?: any;

   @IsOptional()
   audio_file?: any;

   @IsOptional()
   video_file?: any;

   @IsOptional()
   coverImage?: any;
}
