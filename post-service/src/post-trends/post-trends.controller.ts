import {
  Controller,
  Get,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostTrendsService } from './post-trends.service';

@ApiTags('post-trends')
@Controller('post-trends')
export class PostTrendsController {
  constructor(private readonly postTrendsService: PostTrendsService) {}

  @ApiOperation({ summary: 'Get all post-trends information' })
  @ApiResponse({ status: 200, description: 'Returned all post-trends' })
  @EventPattern('post_created')
  handlePostCreated(){
    this.postTrendsService.findAll();
  }
}
