export class UserLogCreatedEvent {
  constructor(
    public readonly userName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
