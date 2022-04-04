import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannedUsersDto } from './dtos/create-banned-users.dto';
import { BannedUsers } from './entities/banned-users.entity';
import { BannedCreatedEvent } from './events/banned-created.event';
import { BannedUpdatedEvent } from './events/banned-updated.event';

@Injectable()
export class BannedUsersService {
  constructor(
    @InjectRepository(BannedUsers)
    private readonly bannedUsersRepository: EntityRepository<BannedUsers>,
  ) {}

  handleGetBanned() {
    console.log();
  }

  handleGetBan(id: string) {
    console.log(id);
  }

  handleBanCreated(bannedCreatedEvent: BannedCreatedEvent) {
    console.log(bannedCreatedEvent);
  }

  handleUpdateBan(bannedUpdatedEvent: BannedUpdatedEvent) {
    console.log(bannedUpdatedEvent);
  }

  handleDeleteBan(id: string) {
    console.log(id);
  }
}
