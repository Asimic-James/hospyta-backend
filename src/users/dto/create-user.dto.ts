import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The username of the user' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The password of the user' })
    password: string;

    @IsOptional()
    @ApiProperty({ description: 'The profile picture of the user' })
    profilePicture: string;

}