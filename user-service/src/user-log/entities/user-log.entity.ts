import {
  Entity,
  Filter,
  OneToMany,
  OneToOne,
  Property,
  Unique,
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
  @Unique()
  userName!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Property({ columnType: 'text', default: 'regular' })
  userRole: string;

  @OneToOne({
    entity: () => UserData,
    mappedBy: 'userId',
    nullable: true,
    onDelete: 'cascade',
  })
  userData: UserData;

  @OneToOne({
    entity: () => UserFollow,
    mappedBy: 'userId',
    nullable: true,
    onDelete: 'cascade',
  })
  userFollow: UserFollow;

  @OneToOne({
    entity: () => UserMention,
    mappedBy: 'userId',
    nullable: true,
    onDelete: 'cascade',
  })
  userMention: UserMention;

  @OneToMany({
    entity: () => UserMention,
    mappedBy: 'userMentiones',
    nullable: true,
  })
  userMentiones: UserMention;

  @OneToMany({ entity: () => UserFollow, mappedBy: 'userFollowed' })
  userFollowed!: UserFollow;

  @OneToMany({ entity: () => UserFollow, mappedBy: 'userFollowing' })
  userFollowing!: UserFollow;

  @Property({ nullable: true })
  deletedAt?: Date;
}
