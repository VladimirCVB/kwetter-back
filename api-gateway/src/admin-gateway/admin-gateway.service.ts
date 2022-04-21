import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { CreateAdminRequest } from './dto/create-admin-request.dto';
import { UpdateAdminRequest } from './dto/update-admin-request.dto';
import { AdminCreatedEvent } from './events/admin-created.event';
import { AdminUpdatedEvent } from './events/admin-updated.event';

@Injectable()
export class AdminGatewayService {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminClient: ClientProxy,
  ) {}

  createAdmin({ userId, userName }: CreateAdminRequest) {
    return this.adminClient.send(
      'admin_created',
      new AdminCreatedEvent(userId, userName),
    );
  }

  createBan({ userId, userName }: CreateAdminRequest) {
    return this.adminClient.send(
      'ban_created',
      new AdminCreatedEvent(userId, userName),
    );
  }

  getAdmin(userId: string) {
    return this.adminClient.send('get_admin', userId);
  }

  getBan(userName: string) {
    return this.adminClient.send('get_ban', userName);
  }

  getBanned() {
    return this.adminClient.send('get_banned', 0);
  }

  updateAdmin({ userName }: UpdateAdminRequest) {
    return this.adminClient.send('update_admin', new AdminUpdatedEvent(userName));
  }

  updateBan({ userName }: UpdateAdminRequest) {
    return this.adminClient.send('update_ban', new AdminUpdatedEvent(userName));
  }

  deleteBan(userId: string) {
    return this.adminClient.send('delete_ban', userId);
  }

  deleteAdmin(userId: string) {
    return this.adminClient.send('delete_admin', userId);
  }
}
