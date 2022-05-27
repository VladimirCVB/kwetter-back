import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { UserLogService } from './user-log.service';

@ApiTags('user-log')
@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @MessagePattern('get_all_users_logs')
  handleGetAllUsers() {
    return this.userLogService.handleGetAllUsers();
  }

  @MessagePattern('get_user_by_user_name')
  handleGetUserByUserName(userName: string) {
    return this.userLogService.handleGetUserByUserName(userName);
  }

  @MessagePattern('get_user_by_id')
  handleGetUserById(id: string) {
    return this.userLogService.handleGetUserById(id);
  }

  @MessagePattern('user_log_created')
  handleUserCreated(data: any) {
    return this.userLogService.handleUserCreated(data);
  }

  @MessagePattern('update_user_log')
  handleUpdateUser(data: any) {
    return this.userLogService.handleUpdateUser(data.value);
  }

  @MessagePattern('change_admin_rights')
  handleChangeAdminRights(data: { status: boolean; userName: string }) {
    return this.userLogService.handleChangeAdminRights(data);
  }

  @MessagePattern('delete_user')
  handleDeleteUser(data: any) {
    return this.userLogService.handleDeleteUser(data.value);
  }
}
