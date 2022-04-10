export class UserFollowCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly userFollowed: string[],
    public readonly userFollowing: string[],
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      userFollowed: this.userFollowed,
      userFollowing: this.userFollowing,
    });
  }
}
