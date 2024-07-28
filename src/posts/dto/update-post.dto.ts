import { IsEnum, IsOptional, IsString } from "class-validator";
import { HealthCategory } from "../schemas/post.schema";


export class UpdatePostDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    user?: string;

    @IsOptional()
    @IsEnum(HealthCategory)
    category?: HealthCategory;

    @IsOptional()
    @IsString()
    image?: string;
}