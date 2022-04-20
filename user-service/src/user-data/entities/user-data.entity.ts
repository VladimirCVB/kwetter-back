import { Entity, Filter, OneToOne, Property } from '@mikro-orm/core';
import { UserLog } from '../../user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class UserData extends BaseEntity {
  @OneToOne({ entity: () => UserLog, wrappedReference: true })
  userId!: UserLog;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  school: string;

  @Property()
  web: string;

  @Property()
  bio: string;

  @Property({ nullable: true })
  deletedAt?: Date;
}
