import {
  Controller,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { UserLogService } from './user-log.service';
import { CreateUserLogDto } from './dtos/create-user-log.dto';

@ApiTags('user-log')
@Controller('user-log')
// @UseGuards(JwtAuthGuard)
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) { }

  // @Roles(Role.MANAGER)
  // @UseGuards(RolesGuard)
  // @ApiOperation({ summary: 'Get all user-log information' })
  // @ApiResponse({ status: 200, description: 'Returned all user-log' })

  // @MessagePattern('log_user')
  // async handleLogIn(credentials: any) {
  //   const user = this.userLogService.handleLogInUser(credentials.email, credentials.password);
  //   if (await user == null) return 'No user!';
  //   return user;
  // }

  // @Roles(Role.MANAGER)
  // @UseGuards(RolesGuard) get_user_by_user_name
  @MessagePattern('get_all_users')
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

  @MessagePattern('delete_user')
  handleDeleteUser(data: any) {
    return this.userLogService.handleDeleteUser(data.value);
  }
}
