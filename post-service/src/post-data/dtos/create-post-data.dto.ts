import { IsNotEmpty } from 'class-validator';

export class CreatePostDataDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  hearts: number;

  @IsNotEmpty()
  text: string;
}
