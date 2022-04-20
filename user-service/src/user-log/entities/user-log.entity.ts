import {
  Entity,
  Filter,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { UserData } from '../../user-data/entities/user-data.entity';
import { UserFollow } from '../../user-follow/entities/user-follow.entity';
import { UserMention } from '../../user-mentions/entities/user-mention.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
@Filter({
  name: 'isActive',
  cond: { deletedAt: null },
  default: true,
})
export class UserLog extends BaseEntity {
  @Property()
  userName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @OneToOne({ entity: () => UserData, mappedBy: 'userId', hidden: true })
  userData: UserData;

  @OneToOne({ entity: () => UserFollow, mappedBy: 'userId', hidden: true })
  userFollow: UserFollow;

  @OneToOne({ entity: () => UserMention, mappedBy: 'userId', hidden: true })
  userMention: UserMention;

  @OneToMany({
    entity: () => UserMention,
    mappedBy: 'userMentiones',
    hidden: true,
  })
  userMentiones: UserMention;

  @ManyToOne({ entity: () => UserFollow, wrappedReference: true })
  userFollowed!: UserFollow;

  @ManyToOne({ entity: () => UserFollow, wrappedReference: true })
  userFollowing!: UserFollow;

  @Property({ nullable: true })
  deletedAt?: Date;
}
