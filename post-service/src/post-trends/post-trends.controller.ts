import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostTrendsDto } from './dtos/create-post-trends.dto';
import { PostTrends } from './entities/post-trends.entity';
import { PostTrendsService } from './post-trends.service';

@ApiTags('post-trends')
@Controller('post-trends')
export class PostTrendsController {
  constructor(private readonly postTrendsService: PostTrendsService) {}

  @ApiOperation({ summary: 'Get all post-trends information' })
  @ApiResponse({ status: 200, description: 'Returned all post-trends' })
  @Get()
  async findAll(): Promise<PostTrends[]> {
    return this.postTrendsService.findAll();
  }

  @ApiOperation({ summary: 'Get post-trends by id' })
  @ApiResponse({ status: 200, description: 'Returned post-trends by id' })
  @ApiResponse({ status: 404, description: 'Post-trends not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostTrends> {
    return this.postTrendsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create post-trends' })
  @ApiResponse({ status: 201, description: 'post-trends created' })
  @ApiResponse({ status: 400, description: 'Invalid post-trends' })
  @ApiResponse({ status: 409, description: 'Post-trends already exists' })
  @Post()
  async create(@Body() postTrends: CreatePostTrendsDto): Promise<PostTrends> {
    return this.postTrendsService.create(postTrends);
  }

  @ApiOperation({ summary: 'Update post-trends' })
  @ApiResponse({ status: 200, description: 'post-trends updated' })
  @ApiResponse({ status: 400, description: 'Invalid post-trends' })
  @ApiResponse({ status: 404, description: 'Post-trends not found' })
  @ApiResponse({ status: 409, description: 'Post-trends already exists' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() postTrends: CreatePostTrendsDto,
  ): Promise<PostTrends> {
    return this.postTrendsService.update(id, postTrends);
  }

  @ApiOperation({ summary: 'Delete post-trends information by id' })
  @ApiResponse({ status: 200, description: 'Post-trends deleted' })
  @ApiResponse({ status: 404, description: 'Post-trends not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.postTrendsService.delete(id);
  }
}
