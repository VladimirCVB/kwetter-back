import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UpdatePostRequest } from './dto/update-post-request.dto';
import { PostGatewayService } from './post-gateway.service';

@Controller('post-gateway')
export class PostGatewayController {
  constructor(private readonly postGatewayService: PostGatewayService) {}

  @Get()
  getAllPosts() {
    return this.postGatewayService.getAllPosts();
  }

  @Get('/feed')
  getPosts(@Body() userIds: string[]) {
    return this.postGatewayService.getPosts(userIds);
  }

  @Get('/user-posts/:userId')
  getPostByUserId(@Param('userId') userId: string) {
    return this.postGatewayService.getPostByUserId(userId);
  }

  @Get('/:id')
  getPostById(@Body() id: string) {
    return this.postGatewayService.getPostById(id);
  }

  @Get('/trends')
  getPostTrends() {
    return this.postGatewayService.getPostTrends();
  }

  @Post('/create-post')
  createPost(@Body() createPostRequest: CreatePostRequest) {
    return this.postGatewayService.createPost(createPostRequest);
  }

  @Put('/update-post/:id')
  updatePost(@Body() updatePostRequest: UpdatePostRequest) {
    return this.postGatewayService.updatePost(updatePostRequest);
  }

  @Delete('/delete/:id')
  deletePost(@Param() id: string) {
    return this.postGatewayService.deletePost(id);
  }
}
