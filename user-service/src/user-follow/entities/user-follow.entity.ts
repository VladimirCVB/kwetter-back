import { Entity, Filter, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { UserLog } from '../../user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class UserFollow extends BaseEntity {
  @OneToOne({
    entity: () => UserLog,
    wrappedReference: true,
    onDelete: 'cascade',
  })
  userId!: UserLog;

  @ManyToOne({
    entity: () => UserLog,
    wrappedReference: true,
    nullable: true,
    onDelete: 'cascade',
  })
  userFollowed: UserLog[];

  @ManyToOne({
    entity: () => UserLog,
    wrappedReference: true,
    nullable: true,
    onDelete: 'cascade',
  })
  userFollowing: UserLog[];

  @Property({ nullable: true })
  deletedAt?: Date;
}
