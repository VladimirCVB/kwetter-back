import { UserLog } from 'src/user-log/entities/user-log.entity';

export interface CreateUserFollowDto {
  userId: string;
  userFollowed: string;
  userFollowing: string;
}
