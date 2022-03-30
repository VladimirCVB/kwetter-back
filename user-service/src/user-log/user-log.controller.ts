import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { CreateUserLogDto } from './dtos/create-user-log.dto';
import { UserLog } from './entities/user-log.entity';
import { UserLogService } from './user-log.service';

@ApiTags('user-log')
@Controller('user-log')
// @UseGuards(JwtAuthGuard)
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @ApiOperation({ summary: 'Get all user-log information' })
  @ApiResponse({ status: 200, description: 'Returned all user-log' })
  @Get()
  @Roles(Role.MANAGER)
  @UseGuards(RolesGuard)
  async findAll(): Promise<UserLog[]> {
    return this.userLogService.findAll();
  }

  @ApiOperation({ summary: 'Get user-log by id' })
  @ApiResponse({ status: 200, description: 'Returned user-log by id' })
  @ApiResponse({ status: 404, description: 'User-log not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserLog> {
    return this.userLogService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user-log' })
  @ApiResponse({ status: 201, description: 'User-log created' })
  @ApiResponse({ status: 400, description: 'Invalid user-log' })
  @ApiResponse({ status: 409, description: 'User-log already exists' })
  @Post()
  async create(@Body() userLog: CreateUserLogDto): Promise<UserLog> {
    return this.userLogService.create(userLog);
  }

  @ApiOperation({ summary: 'Update user-log' })
  @ApiResponse({ status: 200, description: 'User-log updated' })
  @ApiResponse({ status: 400, description: 'Invalid user-log' })
  @ApiResponse({ status: 404, description: 'User-log not found' })
  @ApiResponse({ status: 409, description: 'User-log already exists' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userLog: CreateUserLogDto,
  ): Promise<UserLog> {
    return this.userLogService.update(id, userLog);
  }

  @ApiOperation({ summary: 'Delete user-log information by id' })
  @ApiResponse({ status: 200, description: 'User-log deleted' })
  @ApiResponse({ status: 404, description: 'User-log not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userLogService.delete(id);
  }
}
