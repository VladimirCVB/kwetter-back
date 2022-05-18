import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { UpdateUserDataRequest } from '../dto/update-user-data-request.dto';
import { UserDataCreatedEvent } from '../events/user-data-created.event';
import { UserDataUpdatedEvent } from '../events/user-data-updated.event';

@Injectable()
export class UserDataGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userDataClient: ClientProxy,
  ) {}

  getAllUsersData() {
    return this.userDataClient.send('get_all_users_data', {});
  }

  getUserDataById(userName: string) {
    return this.userDataClient.send('get_user_data_by_id', userName);
  }

  createUserData({
    userId,
    firstName,
    lastName,
    school,
    bio,
    web,
  }: CreateUserDataRequest) {
    return this.userDataClient.send(
      'user_data_created',
      new UserDataCreatedEvent(userId, firstName, lastName, school, bio, web),
    );
  }

  updateUserData(
    { firstName, lastName, school, bio, web }: UpdateUserDataRequest,
    id: string,
  ) {
    return this.userDataClient.send('update_user_data', {
      userDataUpdatedEvent: new UserDataUpdatedEvent(
        firstName,
        lastName,
        school,
        bio,
        web,
      ),
      id: id,
    });
  }

  deleteUserData(id: string) {
    return this.userDataClient.send('delete_user_data', id);
  }
}
