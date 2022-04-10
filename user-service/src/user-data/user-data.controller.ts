import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { ApiTags } from '@nestjs/swagger';
import { UserDataService } from './user-data.service';

@ApiTags('user-data')
@Controller('user-data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @EventPattern('get_all_users_data')
  handleGetAllUsersData() {
    this.userDataService.handleGetAllUsersData();
  }

  @EventPattern('get_user_data_by_id')
  handleGetUserDataById(data: any) {
    this.userDataService.handleGetUserDataById(data.value);
  }

  @EventPattern('user_data_created')
  handleCreateUserData(data: any) {
    this.userDataService.handleCreateUserData(data.value);
  }

  @EventPattern('update_user_data')
  handleUpdateUserData(data: any) {
    this.userDataService.handleUpdateUserData(data.value[0], data.value[1]);
  }

  @EventPattern('delete_user_data')
  handleDeleteUserData(data: any) {
    this.userDataService.handleDeleteUserData(data.value);
  }
}
