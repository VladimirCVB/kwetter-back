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
    ) { }

    getAllUsersData() {
        this.userDataClient.emit('get_all_users_data', null);
    }

    getUserDataById(userId: string) {
        this.userDataClient.emit('get_user_data_by_id', userId);
    }

    createUserData({ userId, firstName, lastName, school, bio, web }: CreateUserDataRequest) {
        this.userDataClient.emit('user_data_created', new UserDataCreatedEvent(userId, firstName, lastName, school, bio, web));
    }

    updateUserData({ firstName, lastName, school, bio, web }: UpdateUserDataRequest) {
        this.userDataClient.emit('update_user_data', new UserDataUpdatedEvent(firstName, lastName, school, bio, web));
    }

    deleteUserData(userId: string) {
        this.userDataClient.emit('delete_user_data', userId);
    }
}
