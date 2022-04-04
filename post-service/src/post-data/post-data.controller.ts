import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostDataService } from './post-data.service';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('post-data')
@Controller('post-data')
export class PostDataController {
  constructor(private readonly postDataService: PostDataService) {}

  @EventPattern('post_created')
  handlePostCreated(data: any){
    this.postDataService.handlePostCreated(data.value);
  }

  @EventPattern('get_post')
  handleGetPost(data: any){
    this.postDataService.handleGetPost(data.value);
  }

  @EventPattern('update_post')
  handleUpdatePost(data: any){
    this.postDataService.handleUpdatePost(data.value);
  }

  @EventPattern('delete_post')
  handleDeletePost(data: any){
    this.postDataService.handleDeletePost(data.value);
  }
}
