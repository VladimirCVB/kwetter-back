import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostDataService } from './post-data.service';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('post-data')
@Controller('post-data')
export class PostDataController {
  constructor(private readonly postDataService: PostDataService) {}

  @EventPattern('get_all_posts')
  handleGetAllPosts() {
    this.postDataService.handleGetAllPosts();
  }

  @EventPattern('get_posts_of_users')
  handleGetPosts(data: any) {
    this.postDataService.handleGetPosts(data.value);
  }

  @EventPattern('get_posts_by_userId')
  handleGetPostByUserId(data: any) {
    this.postDataService.handleGetPostByUserId(data.value);
  }

  @EventPattern('get_post_by_id')
  handleGetPostById(data: any) {
    this.postDataService.handleGetPostById(data.value);
  }

  @EventPattern('post_created')
  handlePostCreated(data: any) {
    this.postDataService.handlePostCreated(data.value);
  }

  @EventPattern('update_post')
  handleUpdatePost(data: any) {
    this.postDataService.handleUpdatePost(data.value);
  }

  @EventPattern('delete_post')
  handleDeletePost(data: any) {
    this.postDataService.handleDeletePost(data.value);
  }
}
