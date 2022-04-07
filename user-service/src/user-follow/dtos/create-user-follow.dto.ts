import { IsNotEmpty } from 'class-validator';
import { UserLog } from 'src/user-log/entities/user-log.entity';

export class CreateUserFollowDto {
  @IsNotEmpty()
  userId: UserLog;

  @IsNotEmpty()
  userFollowed: UserLog[];

  @IsNotEmpty()
  userFollowing: UserLog[];
}
