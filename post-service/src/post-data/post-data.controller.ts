import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDataDto } from './dtos/create-post-data.dto';
import { PostData } from './entities/post-data.entity';
import { PostDataService } from './post-data.service';

@ApiTags('post-data')
@Controller('post-data')
export class PostDataController {

    constructor(private readonly postDataService: PostDataService) { }

    @ApiOperation({ summary: 'Get all post-data information' })
    @ApiResponse({ status: 200, description: 'Returned all post-data' })
    @Get()
    async findAll(): Promise<PostData[]> {
        return this.postDataService.findAll();
    }

    @ApiOperation({ summary: 'Get post-data by id' })
    @ApiResponse({ status: 200, description: 'Returned post-data by id' })
    @ApiResponse({ status: 404, description: 'Post-data not found' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PostData> {
        return this.postDataService.findOne(id);
    }

    @ApiOperation({ summary: 'Create post-data' })
    @ApiResponse({ status: 201, description: 'post-data created' })
    @ApiResponse({ status: 400, description: 'Invalid post-data' })
    @ApiResponse({ status: 409, description: 'Post-data already exists' })
    @Post()
    async create(@Body() postData: CreatePostDataDto): Promise<PostData> {
        return this.postDataService.create(postData);
    }

    @ApiOperation({ summary: 'Update post-data' })
    @ApiResponse({ status: 200, description: 'post-data updated' })
    @ApiResponse({ status: 400, description: 'Invalid post-data' })
    @ApiResponse({ status: 404, description: 'Post-data not found' })
    @ApiResponse({ status: 409, description: 'Post-data already exists' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() postData: CreatePostDataDto,
    ): Promise<PostData> {
        return this.postDataService.update(id, postData);
    }

    @ApiOperation({ summary: 'Delete post-data information by id' })
    @ApiResponse({ status: 200, description: 'Post-data deleted' })
    @ApiResponse({ status: 404, description: 'Post-data not found' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.postDataService.delete(id);
    }
}
