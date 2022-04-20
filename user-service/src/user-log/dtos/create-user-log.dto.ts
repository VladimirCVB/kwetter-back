import { IsNotEmpty } from 'class-validator';

export class CreateUserLogDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
