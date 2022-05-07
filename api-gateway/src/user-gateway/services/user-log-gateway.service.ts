import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogCreatedEvent } from '../events/user-log-created.event';

@Injectable()
export class UserLogGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userLogClient: ClientProxy,
  ) { }

  getAllUsers() {;
    return this.userLogClient.send('get_all_users', {});
  }

  getUserById(userId: string) {
    return this.userLogClient.send('get_user_by_id', userId);
  }

  getUserByCredentials(email: string, password: string) {
    return this.userLogClient.send('get_user_by_credentials', {
      email: email,
      password: password,
    });
  }

  createUser({ userName, email, password }: CreateUserLogRequest) {
    return this.userLogClient.send(
      'user_log_created',
      new UserLogCreatedEvent(userName, email, password),
    );
  }

  updateUser({ userName, email, password }: CreateUserLogRequest) {
    return this.userLogClient.send(
      'update_user_log',
      new UserLogCreatedEvent(userName, email, password),
    );
  }

  deleteUser(userId: string) {
    return this.userLogClient.send('delete_user', userId);
  }
}
