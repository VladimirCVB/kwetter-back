import { Collection, Entity, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserFollow extends BaseEntity {
  @Property()
  userId!: UserLog;

  @ManyToOne(() => UserLog)
  userFollowed: UserLog;

  @Property()
  userFollowing = new Collection<UserLog>(this);

}