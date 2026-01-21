import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterDto{
    @IsString()
    @ApiProperty({
        example: "John Doe",
    })
    name: string;

    @IsEmail()
    @ApiProperty({
        example: "user@example.com",
    })
    email: string;

    @MinLength(4)
    @ApiProperty({
        example: "password",
    })
    password: string;
}