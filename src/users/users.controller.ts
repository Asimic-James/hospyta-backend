import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { LocalAuthGuard } from 'src/auth/local.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from './schemas/user.schema';


@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserEntity})
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() user: CreateUserDto, @Req() req: Request) {
        const userExists = await this.userService.findOne(user.username);
        if (userExists) {
            throw new BadRequestException('User already exists');
        }
        return this.userService.create(user);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users', type: [UserEntity] })
    async findAll() {
        return this.userService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: UserEntity})
    async delete(@Req() req: Request) {

        const loggedInUser = req.user as any;
        if (!loggedInUser) {
            throw new BadRequestException('User not found');
        }
        console.log({loggedInUserId: loggedInUser._id}, {reqUser: req.params.id})
        if (loggedInUser._id.toString() !== req.params.id) {
            throw new BadRequestException('You are not allowed to delete this user');
        }

        if (!req.params.id || req.params.id === 'undefined') {
            throw new BadRequestException('Missing id parameter');
        }

        const user = await this.userService.findById(req.params.id);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return this.userService.delete(req.params.id);
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get one user' })
    @ApiResponse({ status: 200, description: 'Return one user', type: [UserEntity] })
    async findOne(@Req() req: Request) {
        if (!req.params.id || req.params.id === 'undefined') {
            throw new BadRequestException('Missing id parameter');
        }

        const user = await this.userService.findById(req.params.id);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return this.userService.findById(req.params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'Return updated user', type: [UserEntity] })
    async update(@Req() req: Request, @Body() user: CreateUserDto) {
        if (!req.params.id || req.params.id === 'undefined') {
            throw new BadRequestException('Missing id parameter');
        }
        const userExists = await this.userService.findById(req.params.id);
        if (!userExists) {
            throw new BadRequestException('User not found');
        }

        const loggedInUser = req.user as any;
        if (!loggedInUser) {
            throw new BadRequestException('User not found');
        }
        console.log({loggedInUserId: loggedInUser._id}, {reqUser: req.params.id})
        if (loggedInUser._id.toString() !== req.params.id) {
            throw new ForbiddenException('You are not update to delete this user');
        }
        return this.userService.update(req.params.id, user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'Return JWT token', type: [UserEntity] })
    async login(@Req() req: Request) {
        const {username, password} = req.body;
        const user = await this.userService.findOne(username);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const token = await this.authService.validateUser(req.body)

        if (!token) {
            throw new BadRequestException('Wrong username or password');
        }
        
        return {token, message: 'Login successful'};
    }
    

}
