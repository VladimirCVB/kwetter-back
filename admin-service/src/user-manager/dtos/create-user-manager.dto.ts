import { IsNotEmpty } from 'class-validator';

export class CreateUserManagerDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;
}
