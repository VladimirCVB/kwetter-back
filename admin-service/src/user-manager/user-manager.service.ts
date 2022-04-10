import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserManager } from './entities/user-manager.entity';
import { AdminCreatedEvent } from './events/admin-created.event';

@Injectable()
export class UserManagerService {
  constructor(
    @InjectRepository(UserManager)
    private readonly userManagerRepository: EntityRepository<UserManager>,
  ) {}

  /**
   * Retrieve one admin by id.
   * @param admin_id is the id of the admin.
   * @returns an admin.
   */
  async handleGetAdmin(admin_id: string): Promise<UserManager> {
    return await this.userManagerRepository.findOne({ id: admin_id });
  }

  /**
   * Creates a new admin in the database.
   * @param adminCreatedEvent is the admin data.
   * @returns the newly created admin.
   */
  async handleAdminCreated(
    adminCreatedEvent: AdminCreatedEvent,
  ): Promise<UserManager> {
    const admin = this.userManagerRepository.create(adminCreatedEvent);
    await this.userManagerRepository.persistAndFlush(admin);
    return admin;
  }

  /**
   * Updates an admin.
   * @param adminCreatedEvent is the admin data.
   * @returns the newly created admin.
   */
  async handleUpdateAdmin(
    adminCreatedEvent: AdminCreatedEvent,
  ): Promise<UserManager> {
    const admin = await this.handleGetAdmin(adminCreatedEvent.userId);
    if (!admin) throw new NotFoundException('Admin not found');

    admin.userName = adminCreatedEvent.userName;

    await this.userManagerRepository.persistAndFlush(admin);
    return admin;
  }

  /**
   * Update deletedAt property of an admin.
   * @param adminId is the id of the admin.
   * @returns an admin.
   */
  async handleDeleteAdmin(adminId: string): Promise<void> {
    const admin = await this.handleGetAdmin(adminId);
    if (!admin) throw new NotFoundException('Admin not found');

    wrap(admin).assign({ ...admin, deletedAt: new Date() } as UserManager);

    return await this.userManagerRepository.flush();
  }
}
