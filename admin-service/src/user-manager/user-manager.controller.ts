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
import { CreateUserManagerDto } from './dtos/create-user-manager.dto';
import { UserManager } from './entities/user-manager.entity';
import { UserManagerService } from './user-manager.service';

@ApiTags('user-manager')
@Controller('user-manager')
export class UserManagerController {
  constructor(private readonly userManagerService: UserManagerService) {}

  @ApiOperation({ summary: 'Get all user-manager information' })
  @ApiResponse({ status: 200, description: 'Returned all user-manager' })
  @Get()
  async findAll(): Promise<UserManager[]> {
    return this.userManagerService.findAll();
  }

  @ApiOperation({ summary: 'Get user-manager by id' })
  @ApiResponse({ status: 200, description: 'Returned user-manager by id' })
  @ApiResponse({ status: 404, description: 'User-manager not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserManager> {
    return this.userManagerService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user-manager' })
  @ApiResponse({ status: 201, description: 'user-manager created' })
  @ApiResponse({ status: 400, description: 'Invalid user-manager' })
  @ApiResponse({ status: 409, description: 'User-manager already exists' })
  @Post()
  async create(
    @Body() userManager: CreateUserManagerDto,
  ): Promise<UserManager> {
    return this.userManagerService.create(userManager);
  }

  @ApiOperation({ summary: 'Update user-manager' })
  @ApiResponse({ status: 200, description: 'user-manager updated' })
  @ApiResponse({ status: 400, description: 'Invalid user-manager' })
  @ApiResponse({ status: 404, description: 'User-manager not found' })
  @ApiResponse({ status: 409, description: 'User-manager already exists' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userManager: CreateUserManagerDto,
  ): Promise<UserManager> {
    return this.userManagerService.update(id, userManager);
  }

  @ApiOperation({ summary: 'Delete user-manager information by id' })
  @ApiResponse({ status: 200, description: 'User-manager deleted' })
  @ApiResponse({ status: 404, description: 'User-manager not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userManagerService.delete(id);
  }
}
