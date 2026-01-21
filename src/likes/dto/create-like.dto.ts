import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLikeDto {
    // @ApiProperty({example: "song_Id"})
    @IsString()
    song_id: string
}
