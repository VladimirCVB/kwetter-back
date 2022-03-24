import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserAdministrator extends BaseEntity {
  @Property()
  userId!: string;
}