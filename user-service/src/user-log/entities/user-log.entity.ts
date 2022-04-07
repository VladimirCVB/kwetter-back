import {
  Entity,
  Filter,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { UserData } from 'src/user-data/entities/user-data.entity';
import { UserFollow } from 'src/user-follow/entities/user-follow.entity';
import { UserMention } from 'src/user-mentions/entities/user-mention.entity';
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

  @OneToOne({ entity: () => UserData, wrappedReference: true })
  userData: UserData;

  @OneToOne({ entity: () => UserFollow, wrappedReference: true })
  userFollow: UserFollow;

  @OneToOne({ entity: () => UserMention, wrappedReference: true })
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
