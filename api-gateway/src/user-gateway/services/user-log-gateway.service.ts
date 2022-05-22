import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogCreatedEvent } from '../events/user-log-created.event';
import { UserLogUpdatedEvent } from '../events/user-log-updated.event';

@Injectable()
export class UserLogGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userLogClient: ClientProxy,
  ) { }

  getAllUsers() {
    return this.userLogClient.send('get_all_users_logs', {});
  }

  getUserById(userId: string) {
    return this.userLogClient.send('get_user_by_id', userId);
  }

  getUserByUserName(userName: string) {
    return this.userLogClient.send('get_user_by_user_name', userName);
  }

  getUserByCredentials(email: string, password: string) {
    return this.userLogClient.send('get_user_by_credentials', {
      email: email,
      password: password,
    });
  }

  createUser({ userName, email, password, firstName, lastName }: CreateUserLogRequest) {
    return this.userLogClient.send(
      'user_log_created',
      new UserLogCreatedEvent(userName, email, password, firstName, lastName),
    );
  }

  updateUser({ userName, email, password }: CreateUserLogRequest) {
    return this.userLogClient.send(
      'update_user_log',
      new UserLogUpdatedEvent(userName, email, password),
    );
  }

  changeAdminRights(status: boolean, userName: string) {
    return this.userLogClient.send(
      'change_admin_rights',
      { status, userName },
    );
  }

  deleteUser(userId: string) {
    return this.userLogClient.send('delete_user', userId);
  }
}
