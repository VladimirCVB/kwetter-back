import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserFollow extends BaseEntity {
  @Property()
  userId!: string;

  @Property()
  userFollowed: string;

  @Property()
  userFollowing = new Collection<string>(this);
}
