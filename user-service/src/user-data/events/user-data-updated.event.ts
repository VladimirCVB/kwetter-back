export class UserDataUpdatedEvent {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly school: string,
    public readonly web: string,
    public readonly bio: string,
  ) {}
}
