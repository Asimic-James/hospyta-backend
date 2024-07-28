import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])
  ],
  providers: [UsersService, AuthService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

//
