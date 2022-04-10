export class UserDataCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly school: string,
    public readonly web: string,
    public readonly bio: string,
  ) {}
}
