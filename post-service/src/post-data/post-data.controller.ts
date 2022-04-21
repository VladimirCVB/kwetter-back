import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostDataService } from './post-data.service';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('post-data')
@Controller('post-data')
export class PostDataController {
  constructor(private readonly postDataService: PostDataService) { }

  @MessagePattern('get_all_posts')
  handleGetAllPosts() {
    return this.postDataService.handleGetAllPosts();
  }

  @MessagePattern('get_posts_of_users')
  handleGetPosts(data: any) {
    return this.postDataService.handleGetPosts(data.value);
  }

  @MessagePattern({ cmd: 'get_posts_by_userId' })
  handleGetPostByUserId(user_id: string) {
    return this.postDataService.handleGetPostByUserId(user_id);
  }

  @MessagePattern('get_post_by_id')
  handleGetPostById(data: any) {
    return this.postDataService.handleGetPostById(data.value);
  }

  @MessagePattern('post_created')
  handlePostCreated(data: any) {
    return this.postDataService.handlePostCreated(data.value);
  }

  @MessagePattern('update_post')
  handleUpdatePost(data: any) {
    return this.postDataService.handleUpdatePost(data.value);
  }

  @MessagePattern('delete_post')
  handleDeletePost(data: any) {
    return this.postDataService.handleDeletePost(data.value);
  }
}
