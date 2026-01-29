import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSongInteractionDto {
    @IsString()
    @ApiProperty({
        example: "action"
    })
    @IsNotEmpty()
    action: string;

    @IsString()
    @ApiProperty({
        example: "song_id"
    })

    @IsNotEmpty()
    song_id: string;
}
