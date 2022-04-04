import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { PostGatewayService } from './post-gateway.service';

@Controller('post-gateway')
export class PostGatewayController {

  constructor(private readonly postGatewayService: PostGatewayService) { }

  @Post()
  createPost(@Body() createPostRequest: CreatePostRequest) {
    this.postGatewayService.createPost(createPostRequest);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    this.postGatewayService.getPost(id);
  }
}
