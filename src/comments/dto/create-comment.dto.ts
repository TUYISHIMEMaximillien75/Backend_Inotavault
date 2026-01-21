import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentDto {
    // @ApiProperty({example: "User Id"})
    // @IsString()
    // userId: string

    @ApiProperty({example: "Comment"})
    @IsString()
    comment: string

    @ApiProperty({example: "Song Id"})
    @IsString()
    song_id: string
}
