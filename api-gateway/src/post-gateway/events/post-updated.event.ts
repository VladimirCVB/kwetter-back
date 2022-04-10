export class PostUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly hearts: number,
    public readonly userName: string,
    public readonly trends: string[],
  ) {}

  toString() {
    return JSON.stringify({
      id: this.id,
      text: this.text,
      hearts: this.hearts,
      userName: this.userName,
      trends: this.trends,
    });
  }
}
