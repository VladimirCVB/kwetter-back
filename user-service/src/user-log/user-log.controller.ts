import {
  Controller,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserLogService } from './user-log.service';

@ApiTags('user-log')
@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) { }

  @EventPattern('get_all_users')
  handleGetAllUsers() {
    this.userLogService.handleGetAllUsers();
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
