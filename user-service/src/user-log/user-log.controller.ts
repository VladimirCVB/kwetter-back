import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { UserLog } from './entities/user-log.entity';
import { EventPattern } from '@nestjs/microservices';
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
    return this.userLogService.handleGetAllUsers();
  }

  @EventPattern('get_user_by_id')
  handleGetUserById(data: any) {
    this.userLogService.handleGetUserById(data.value);
  }

  @EventPattern('user_log_created')
  handleUserCreated(data: any) {
    this.userLogService.handleUserCreated(data.value);
  }

  @EventPattern('update_user_log')
  handleUpdateUser(data: any) {
    this.userLogService.handleUpdateUser(data.value);
  }

  @EventPattern('delete_user')
  handleDeleteUser(data: any) {
    this.userLogService.handleDeleteUser(data.value);
  }
}
