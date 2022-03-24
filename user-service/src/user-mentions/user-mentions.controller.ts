import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserMentionDto } from './dtos/create-user-mention.dto';
import { UserMention } from './entities/user-mention.entity';
import { UserMentionsService } from './user-mentions.service';

@ApiTags('user-mentions')
@Controller('user-mentions')
export class UserMentionsController {

    constructor(private readonly userMentionService: UserMentionsService) { }

    @ApiOperation({ summary: 'Get all user-mention information' })
    @ApiResponse({ status: 200, description: 'Returned all user-mention' })
    @Get()
    async findAll(): Promise<UserMention[]> {
        return this.userMentionService.findAll();
    }

    @ApiOperation({ summary: 'Get user-mention by id' })
    @ApiResponse({ status: 200, description: 'Returned user-mention by id' })
    @ApiResponse({ status: 404, description: 'User-mention not found' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserMention> {
        return this.userMentionService.findOne(id);
    }

    @ApiOperation({ summary: 'Create user-mention' })
    @ApiResponse({ status: 201, description: 'User-mention created' })
    @ApiResponse({ status: 400, description: 'Invalid user-mention' })
    @ApiResponse({ status: 409, description: 'User-mention already exists' })
    @Post()
    async create(@Body() userMention: CreateUserMentionDto): Promise<UserMention> {
        return this.userMentionService.create(userMention);
    }

    @ApiOperation({ summary: 'Update user-mention' })
    @ApiResponse({ status: 200, description: 'User-mention updated' })
    @ApiResponse({ status: 400, description: 'Invalid user-mention' })
    @ApiResponse({ status: 404, description: 'User-mention not found' })
    @ApiResponse({ status: 409, description: 'User-mention already exists' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() userMention: CreateUserMentionDto,
    ): Promise<UserMention> {
        return this.userMentionService.update(id, userMention);
    }

    @ApiOperation({ summary: 'Delete user-mention information by id' })
    @ApiResponse({ status: 200, description: 'User-mention deleted' })
    @ApiResponse({ status: 404, description: 'User-mention not found' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userMentionService.delete(id);
    }
}
