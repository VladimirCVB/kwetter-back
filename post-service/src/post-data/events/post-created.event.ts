export class PostCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly text: string,
    public readonly trends: string[],
  ) {}
}
