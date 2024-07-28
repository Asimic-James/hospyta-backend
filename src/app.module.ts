import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }), 
    MongooseModule.forRoot(process.env.MONGO_URI), 
    PostsModule,
    CommentsModule,
    AuthModule,
    UsersModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    Logger.log(`JWT_SECRET: ${jwtSecret}`);
    console.log(`JWT_SECRET: ${jwtSecret}`);
  }
}
