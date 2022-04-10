import { IsNotEmpty } from 'class-validator';

export class CreateUserDataDto {
  @IsNotEmpty()
  userId: string;

  firstName: string;

  lastName: string;

  school: string;

  web: string;

  bio: string;
}
