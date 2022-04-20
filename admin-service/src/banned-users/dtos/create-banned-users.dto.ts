import { IsNotEmpty } from 'class-validator';

export class CreateBannedUsersDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;
}
