// import { PostTrends } from "src/post-trends/entities/post-trends.entity";

export interface CreatePostDataDto {
  userId: string;
  hearts: number;
  text: string;
  trends: string;
  // testProp: PostTrends;
}
