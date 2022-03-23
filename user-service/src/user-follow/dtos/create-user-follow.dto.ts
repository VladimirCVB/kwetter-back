import { UserLog } from "src/user-log/entities/user-log.entity";

export interface CreateUserFollowDto {
    userId: UserLog;
    userFollowed: UserLog;
    userFollowing: UserLog;
  }