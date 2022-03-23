import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserLog extends BaseEntity {

  @Property()
  userName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

}