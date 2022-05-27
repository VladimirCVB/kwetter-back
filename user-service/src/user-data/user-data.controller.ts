import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ApiTags } from '@nestjs/swagger';
import { UserDataService } from './user-data.service';

@ApiTags('user-data')
@Controller('user-data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @MessagePattern('get_all_users_data')
  handleGetAllUsersData() {
    return this.userDataService.handleGetAllUsersData();
  }

  @MessagePattern('get_user_data_by_id')
  handleGetUserDataById(userId: string) {
    return this.userDataService.handleGetUserDataById(userId);
  }

  @MessagePattern('user_data_created')
  handleCreateUserData(data: any) {
    return this.userDataService.handleCreateUserData(data.value);
  }

  @MessagePattern('update_user_data')
  handleUpdateUserData(data: any) {
    return this.userDataService.handleUpdateUserData(
      data.value[0],
      data.value[1],
    );
  }

  @MessagePattern('delete_user_data')
  handleDeleteUserData(data: any) {
    return this.userDataService.handleDeleteUserData(data.value);
  }
}
