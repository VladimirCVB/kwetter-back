import { IsNotEmpty } from 'class-validator';
import { UserLog } from 'src/user-log/entities/user-log.entity';

export class CreateUserDataDto {
  @IsNotEmpty()
  userId: UserLog;

  firstName: string;

  lastName: string;

  school: string;

  web: string;

  bio: string;
}
