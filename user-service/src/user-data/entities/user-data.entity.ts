import { Entity, Filter, OneToOne, Property } from '@mikro-orm/core';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class UserData extends BaseEntity {
  @OneToOne(() => UserLog, (user) => user.id)
  userId!: string;

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
