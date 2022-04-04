import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserManagerDto } from './dtos/create-user-manager.dto';
import { UserManager } from './entities/user-manager.entity';
import { AdminCreatedEvent } from './events/admin-created.event';
import { AdminUpdatedEvent } from './events/admin-updated.event';

@Injectable()
export class UserManagerService {
  constructor(
    @InjectRepository(UserManager)
    private readonly userManagerRepository: EntityRepository<UserManager>,
  ) {}

  handleGetAdmin(id: string) {
    console.log(id);
  }

  handleAdminCreated(bannedCreatedEvent: AdminCreatedEvent) {
    console.log(bannedCreatedEvent);
  }

  handleUpdateAdmin(bannedUpdatedEvent: AdminUpdatedEvent) {
    console.log(bannedUpdatedEvent);
  }

  handleDeleteAdmin(id: string) {
    console.log(id);
  }
}
