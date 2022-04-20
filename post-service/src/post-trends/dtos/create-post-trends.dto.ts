import { IsNotEmpty } from 'class-validator';

export class CreatePostDataDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  trends: string[] = [];
}
