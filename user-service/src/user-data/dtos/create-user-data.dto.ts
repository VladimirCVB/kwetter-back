import { IsNotEmpty } from 'class-validator';

export class CreateUserDataDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  school: string;

  web: string;

  bio: string;
}
