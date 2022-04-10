import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogCreatedEvent } from '../events/user-log-created.event';

@Injectable()
export class UserLogGatewayService {
    constructor(
        @Inject('USER_SERVICE') private readonly userLogClient: ClientKafka,
    ) { }

    getAllUsers() {
        this.userLogClient.emit('get_all_users', null);
    }

    getUserById(userId: string) {
        this.userLogClient.emit('get_user_by_id', userId);
    }

    getUserByCredentials(email: string, password: string) {
        this.userLogClient.emit('get_user_by_credentials', { email: email, password: password });
    }

    createUser({ userName, email, password }: CreateUserLogRequest) {
        this.userLogClient.emit('user_log_created', new UserLogCreatedEvent(userName, email, password));
    }

    updateUser({ userName, email, password }: CreateUserLogRequest) {
        this.userLogClient.emit('update_user_log', new UserLogCreatedEvent(userName, email, password));
    }

    deleteUser(userId: string) {
        this.userLogClient.emit('delete_user', userId);
    }
}
