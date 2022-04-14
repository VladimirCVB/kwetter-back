import { Entity, Filter, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { UserLog } from '../../user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class UserFollow extends BaseEntity {
  @OneToOne({ entity: () => UserLog, wrappedReference: true })
  userId!: UserLog;

  @OneToMany({ entity: () => UserLog, mappedBy: 'userFollowed', hidden: true })
  userFollowed: UserLog[];

  @OneToMany({ entity: () => UserLog, mappedBy: 'userFollowing', hidden: true })
  userFollowing: UserLog[];

  @Property({ nullable: true })
  deletedAt?: Date;
}
