import { Entity, Filter, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class UserMention extends BaseEntity {
  @OneToOne(() => UserLog, (user) => user.id)
  userId!: UserLog;

  @ManyToOne({ entity: () => UserLog, wrappedReference: true })
  userMentiones!: UserLog[];

  @Property()
  postId!: string;

  @Property({ nullable: true })
  deletedAt?: Date;
}
