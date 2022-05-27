import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UpdatePostRequest } from './dto/update-post-request.dto';
import { PostGatewayService } from './post-gateway.service';

@Controller('post-gateway')
export class PostGatewayController {
  constructor(private readonly postGatewayService: PostGatewayService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all the post data',
  })
  @Get()
  getAllPosts() {
    return this.postGatewayService.getAllPosts();
  }

  @Get('/feed')
  getPosts(@Body() userIds: string[]) {
    return this.postGatewayService.getPosts(userIds);
  }

  @ApiOperation({ summary: 'Get user posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns user posts by userId',
  })
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

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({
    status: 201,
    description: 'Creates new post',
  })
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
