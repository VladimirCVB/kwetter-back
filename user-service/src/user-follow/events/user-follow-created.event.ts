export class UserFollowCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly userFollowed: string[],
    public readonly userFollowing: string[],
  ) {}
}
