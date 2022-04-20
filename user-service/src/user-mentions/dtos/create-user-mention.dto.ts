import { IsNotEmpty } from 'class-validator';
import { UserLog } from 'src/user-log/entities/user-log.entity';

export class CreateUserMentionDto {
  @IsNotEmpty()
  userId: UserLog;

  @IsNotEmpty()
  userMentiones: UserLog[];

  @IsNotEmpty()
  postId: string;
}
