export class BannedCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly userName: string,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      userName: this.userName,
    });
  }
}
