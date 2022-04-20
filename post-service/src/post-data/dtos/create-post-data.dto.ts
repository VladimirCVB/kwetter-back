import { IsNotEmpty } from 'class-validator';

export class CreatePostDataDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  hearts: number;

  @IsNotEmpty()
  text: string;
}
