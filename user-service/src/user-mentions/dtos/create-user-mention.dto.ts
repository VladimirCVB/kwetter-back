import { UserLog } from 'src/user-log/entities/user-log.entity';

export interface CreateUserMentionDto {
  userId: string;
  userMentioned: string;
  postId: string;
}
