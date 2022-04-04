import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UpdatePostRequest } from './dto/update-post-request.dto';
import { PostGatewayService } from './post-gateway.service';

@Controller('post-gateway')
export class PostGatewayController {

  constructor(private readonly postGatewayService: PostGatewayService) { }

  @Get(':id')
  getPost(@Param('id') userId: string) {
    this.postGatewayService.getPost(userId);
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
