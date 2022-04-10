export class UserMentionCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly userMentions: string[],
    public readonly postId: string,
  ) {}
}
