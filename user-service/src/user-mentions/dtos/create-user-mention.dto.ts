import { UserLog } from "src/user-log/entities/user-log.entity";

export interface CreateUserMentionDto {
    userId: UserLog,
    userMentioned: UserLog,
    postId: string
}