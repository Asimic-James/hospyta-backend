import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/schemas/user.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from './schemas/post.schema';

@ApiTags('posts')
@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}
    
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: PostEntity })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
        const user = req.user as any;
        console.log({user})
        if (!createPostDto.category || !createPostDto.content) {
            throw new BadRequestException('Missing required fields');
        }
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const recordExists = await this.postsService.findOneByContent(createPostDto.content);
        console.log({recordExists})
        if (recordExists) {
            throw new BadRequestException('Post already exists');
        }
        createPostDto.user = user._id;
        // if (user._id.toString() !== createPostDto.user.toString()) {
        //     throw new BadRequestException('You are not allowed to create a post for this user');
        // }
        return this.postsService.create(createPostDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Return all posts', type: [PostEntity] })
    findAll(@Query('sortBy') sortBy: string, @Req() req: Request) {
        const user = req.user as User;
        console.log({user})
        return this.postsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one post' })
    @ApiResponse({ status: 200, description: 'Return one post', type: [PostEntity] })
    async findOne(@Param('id') id: string) {
        if (!id || id === 'undefined') {
            throw new BadRequestException('Missing id parameter');
        }
        const record = await this.postsService.findOne(id);
        if (!record) {
            throw new BadRequestException('Post not found');
        }
        return this.postsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update one post' })
    @ApiResponse({ status: 200, description: 'Return updated post', type: [PostEntity] })
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
        const user = req.user as any;
        if (!id || id === 'undefined') {
            throw new BadRequestException('Missing id parameter');
        }
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const record = await this.postsService.findOne(id);
        if (!record) {
            throw new BadRequestException('Post not found');
        }
        if (user._id.toString() !== updatePostDto.user.toString()) {
            throw new BadRequestException('You are not allowed to update this post');
        }
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete' })
    @ApiResponse({ status: 200, description: 'Return deleted post', type: [PostEntity] })
    async delete(@Param('id') id: string, @Req() req: Request) {
        try {
            const user = req.user as any;
        if (!id || id === 'undefined') {
            throw new BadRequestException('Missing id parameter');
        }
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const record = await this.postsService.findOne(id);
        if (!record) {
            throw new BadRequestException('Post not found');
        }
        if (user._id.toString() !== record.user.toString()) {
            throw new BadRequestException('You are not allowed to delete this post');
        }
        return this.postsService.delete(id);
        } catch (error) {
            return new HttpException(error.message, error.status);
        }
    }
}
