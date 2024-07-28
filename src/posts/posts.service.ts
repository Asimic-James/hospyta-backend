import { Injectable,NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/schemas/user.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';


@Injectable()
export class PostsService {

    constructor(@InjectModel('Posts') private readonly postModel: Model<PostDocument>) {}
    
    async create(createPostDto: CreatePostDto): Promise<any> {
        // check if the createPostDto is valid
        if (!createPostDto.category || !createPostDto.content || !createPostDto.user) {
            throw new BadRequestException('Missing required fields');
        }
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async findAll(): Promise<any[]> {
        return this.postModel.find().exec();
    }

    async findOneByContent(content: string): Promise<any> {
        return this.postModel.findOne({ content }).exec();
    }

    async findOne(id: string): Promise<any> {
        return this.postModel.findById(id).exec();
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<any> {
       return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.postModel.findByIdAndDelete(id);
    }
}
