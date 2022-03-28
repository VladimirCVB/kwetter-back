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
import { CreateUserFollowDto } from './dtos/create-user-follow.dto';
import { UserFollow } from './entities/user-follow.entity';
import { UserFollowService } from './user-follow.service';

@ApiTags('user-follow')
@Controller('user-follow')
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}

  @ApiOperation({ summary: 'Get all user-follow information' })
  @ApiResponse({ status: 200, description: 'Returned all user-follow' })
  @Get()
  async findAll(): Promise<UserFollow[]> {
    return this.userFollowService.findAll();
  }

  @ApiOperation({ summary: 'Get user-follow by id' })
  @ApiResponse({ status: 200, description: 'Returned user-follow by id' })
  @ApiResponse({ status: 404, description: 'User-follow not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserFollow> {
    return this.userFollowService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user-follow' })
  @ApiResponse({ status: 201, description: 'User-follow created' })
  @ApiResponse({ status: 400, description: 'Invalid user-follow' })
  @ApiResponse({ status: 409, description: 'User-follow already exists' })
  @Post()
  async create(@Body() userFollow: CreateUserFollowDto): Promise<UserFollow> {
    return this.userFollowService.create(userFollow);
  }

  @ApiOperation({ summary: 'Update user-follow' })
  @ApiResponse({ status: 200, description: 'User-follow updated' })
  @ApiResponse({ status: 400, description: 'Invalid user-follow' })
  @ApiResponse({ status: 404, description: 'User-follow not found' })
  @ApiResponse({ status: 409, description: 'User-follow already exists' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userFollow: CreateUserFollowDto,
  ): Promise<UserFollow> {
    return this.userFollowService.update(id, userFollow);
  }

  @ApiOperation({ summary: 'Delete user-follow information by id' })
  @ApiResponse({ status: 200, description: 'User-follow deleted' })
  @ApiResponse({ status: 404, description: 'User-follow not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userFollowService.delete(id);
  }
}
