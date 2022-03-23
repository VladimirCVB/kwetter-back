import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserData extends BaseEntity {
  // @OneToOne()
  // userId!: UserLo;

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