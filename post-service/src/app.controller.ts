import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('post_created')
  handlePostCreated(data: any){
    this.appService.handlePostCreated(data.value);
  }

  @EventPattern('get_post')
  handleGetPost(data: any){
    this.appService.handleGetPost(data.value);
  }
}
