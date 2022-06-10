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
  @OneToOne({
    entity: () => UserLog,
    wrappedReference: true,
    onDelete: 'cascade',
  })
  userId!: UserLog;

  @Property({ nullable: true })
  firstName: string;

  @Property({ nullable: true })
  lastName: string;

  @Property({ nullable: true })
  school: string;

  @Property({ nullable: true })
  web: string;

  @Property({ nullable: true })
  bio: string;

  @Property({ nullable: true })
  deletedAt?: Date;
}
