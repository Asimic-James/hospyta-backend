import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { HealthCategory } from "../schemas/post.schema";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";


export  class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The content of the post' })
    content: string;

    @IsNotEmpty()
    @IsEnum(HealthCategory)
    @ApiProperty({ description: 'The category of the post', enum: ['kidney', 'liver', 'heart', 'lungs', 'diabetes', 'other'] })
    readonly category: HealthCategory;

    @Optional()
    @ApiProperty({ description: 'The URL of the image associated with the post', required: false })
    image: string;

    @Optional()
    user: string;

}