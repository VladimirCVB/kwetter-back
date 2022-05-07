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
import { MessagePattern } from '@nestjs/microservices';
import { UserLogService } from './user-log.service';

@ApiTags('user-log')
@Controller('user-log')
// @UseGuards(JwtAuthGuard)
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) { }

  // @Roles(Role.MANAGER)
  // @UseGuards(RolesGuard)
  // @ApiOperation({ summary: 'Get all user-log information' })
  // @ApiResponse({ status: 200, description: 'Returned all user-log' })

  @MessagePattern('get_all_users')
  handleGetAllUsers() {
    return this.userLogService.handleGetAllUsers();
  }

  @MessagePattern('get_user_by_id')
  handleGetUserById(id: string) {
    return this.userLogService.handleGetUserById(id);
  }

  @MessagePattern('user_log_created')
  handleUserCreated(data: any) {
    return this.userLogService.handleUserCreated(data.value);
  }

  @MessagePattern('update_user_log')
  handleUpdateUser(data: any) {
    return this.userLogService.handleUpdateUser(data.value);
  }

  @MessagePattern('delete_user')
  handleDeleteUser(data: any) {
    return this.userLogService.handleDeleteUser(data.value);
  }
}
