import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @Redirect('/api-docs', 302)
  index() {
    return { url: '/api-docs' };
  }

  @Get('health')
  getHealth(): string {
    return 'OK';
  }
}
