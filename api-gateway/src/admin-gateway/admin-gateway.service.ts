import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateAdminRequest } from './dto/create-admin-request.dto';
import { UpdateAdminRequest } from './dto/update-admin-request.dto';
import { AdminCreatedEvent } from './events/admin-created.event';
import { AdminUpdatedEvent } from './events/admin-updated.event';

@Injectable()
export class AdminGatewayService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly adminClient: ClientKafka,
    ) { }

    createAdmin({ userId, userName }: CreateAdminRequest) {
        this.adminClient.emit('admin_created', new AdminCreatedEvent(userId, userName));
    }

    createBan({ userId, userName }: CreateAdminRequest) {
        this.adminClient.emit('ban_created', new AdminCreatedEvent(userId, userName));
    }

    getAdmin(userId: string) {
        this.adminClient.emit('get_admin', userId);
    }

    getBan(userName: string) {
        this.adminClient.emit('get_ban', userName);
    }

    getBanned() {
        this.adminClient.emit('get_banned', 0);
    }

    updateAdmin({ userName }: UpdateAdminRequest) {
        this.adminClient.emit('update_admin', new AdminUpdatedEvent(userName));
    }

    updateBan({ userName }: UpdateAdminRequest) {
        this.adminClient.emit('update_ban', new AdminUpdatedEvent(userName));
    }

    deleteBan(userId: string) {
        this.adminClient.emit('delete_ban', userId);
    }

    deleteAdmin(userId: string) {
        this.adminClient.emit('delete_admin', userId);
    }
}
