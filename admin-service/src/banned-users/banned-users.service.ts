import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BannedUsers } from './entities/banned-users.entity';
import { BannedCreatedEvent } from './events/banned-created.event';

@Injectable()
export class BannedUsersService {
  constructor(
    @InjectRepository(BannedUsers)
    private readonly bannedUsersRepository: EntityRepository<BannedUsers>,
  ) {}

  /**
   * Retrieve all banned users.
   * @returns all banned users.
   */
   async handleGetBanned(): Promise<BannedUsers[]> {
    return await this.bannedUsersRepository.findAll();
  }

  /**
   * Retrieve one banned user by user-name.
   * @param banned_name is the userName of the banned.
   * @returns a banned user.
   */
   async handleGetBan(banned_name: string): Promise<BannedUsers> {
    return await this.bannedUsersRepository.findOne({ userName: banned_name });
  }

  /**
 * Creates a new banned user in the database.
 * @param bannedCreatedEvent is the banned user data.
 * @returns the newly created banned user.
 */
  async handleBanCreated(bannedCreatedEvent: BannedCreatedEvent): Promise<BannedUsers> {
    const bannedUser = this.bannedUsersRepository.create(bannedCreatedEvent);
    await this.bannedUsersRepository.persistAndFlush(bannedUser);
    return bannedUser;
  }

  /**
 * Updates a banned user.
 * @param bannedCreatedEvent is the admin data.
 * @returns the updated banned user.
 */
  async handleUpdateBan(bannedCreatedEvent: BannedCreatedEvent): Promise<BannedUsers> {
    const bannedUser = await this.handleGetBan(bannedCreatedEvent.userId);
    if (!bannedUser) throw new NotFoundException('Banned user not found');

    bannedUser.userName = bannedCreatedEvent.userName;

    await this.bannedUsersRepository.persistAndFlush(bannedUser);
    return bannedUser;
  }

  /**
 * Update deletedAt property of a banned user.
 * @param bannedId is the id of the banned user.
 * @returns a banned user.
 */
  async handleDeleteBan(bannedId: string): Promise<void> {
    const bannedUser = await this.handleGetBan(bannedId);
    if (!bannedUser) throw new NotFoundException('Banned user not found');

    wrap(bannedUser).assign({ ...bannedUser, deletedAt: new Date() } as BannedUsers);

    return await this.bannedUsersRepository.flush();
  }
}
