import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UpdatePostRequest } from './dto/update-post-request.dto';
import { PostGatewayService } from './post-gateway.service';

@Controller('post-gateway')
export class PostGatewayController {

  constructor(private readonly postGatewayService: PostGatewayService) { }

  @Get()
  getAllPosts() {
    this.postGatewayService.getAllPosts();
  }

  @Get()
  getPosts(@Body() userIds: string[]) {
    this.postGatewayService.getPosts(userIds);
  }

  @Get()
  getPostByUserId(@Body() userId: string) {
    this.postGatewayService.getPostByUserId(userId);
  }

  @Get()
  getPostById(@Body() id: string) {
    this.postGatewayService.getPostById(id);
  }

  @Get()
  getPostTrends() {
    this.postGatewayService.getPostTrends();
  }

  @Post()
  createPost(@Body() createPostRequest: CreatePostRequest) {
    this.postGatewayService.createPost(createPostRequest);
  }

  @Put()
  updatePost(@Body() updatePostRequest: UpdatePostRequest) {
    this.postGatewayService.updatePost(updatePostRequest);
  }

  @Delete()
  deletePost(@Body() postId: string) {
    this.postGatewayService.deletePost(postId);
  }
}
