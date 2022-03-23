import { Collection, Entity, ManyToOne, OneToMany, OneToOne } from '@mikro-orm/core';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { BaseEntity } from '../../database/entities/base-entity.entity';

@Entity()
export class UserFollow extends BaseEntity {
  @OneToOne(() => UserLog, user => user.id)
  userId!: UserLog;

  @ManyToOne(() => UserLog)
  userFollowed: UserLog;

  @OneToMany(() => UserLog, userLog => userLog.id)
  userFollowing = new Collection<UserLog>(this);

}