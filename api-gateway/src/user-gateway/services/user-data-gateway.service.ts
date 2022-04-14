import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { UpdateUserDataRequest } from '../dto/update-user-data-request.dto';
import { UserDataCreatedEvent } from '../events/user-data-created.event';
import { UserDataUpdatedEvent } from '../events/user-data-updated.event';

@Injectable()
export class UserDataGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userDataClient: ClientKafka,
  ) {}

  getAllUsersData() {
    this.userDataClient.emit('get_all_users_data', null);
  }

  getUserDataById(id: string) {
    this.userDataClient.emit('get_user_data_by_id', id);
  }

  createUserData({
    userId,
    firstName,
    lastName,
    school,
    bio,
    web,
  }: CreateUserDataRequest) {
    this.userDataClient.emit(
      'user_data_created',
      new UserDataCreatedEvent(userId, firstName, lastName, school, bio, web),
    );
  }

  updateUserData(
    { firstName, lastName, school, bio, web }: UpdateUserDataRequest,
    id: string,
  ) {
    this.userDataClient.emit('update_user_data', {
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
    this.userDataClient.emit('delete_user_data', id);
  }
}