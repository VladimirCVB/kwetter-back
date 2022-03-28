import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserData extends BaseEntity {
  @Property()
  userId!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  school: string;

  @Property()
  web: string;

  @Property()
  bio: string;
}
