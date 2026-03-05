import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateRepertoireSongDto {
    @IsOptional()
    @IsString()
    song_id?: string;

    @IsString()
    title: string;

    @IsString()
    source: 'existing' | 'typed' | 'uploaded';

    @IsOptional()
    @IsString()
    file_uri?: string;

    @IsOptional()
    position?: number;
}

export class CreateRepertoireSectionDto {
    @IsString()
    name: string;

    @IsOptional()
    position?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRepertoireSongDto)
    songs: CreateRepertoireSongDto[];
}

export class CreateRepertoireDto {
    @IsString()
    title: string;

    @IsString()
    event_type: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRepertoireSectionDto)
    sections: CreateRepertoireSectionDto[];
}
