export class UserDataCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly school: string,
    public readonly web: string,
    public readonly bio: string,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      school: this.school,
      web: this.web,
      bio: this.bio,
    });
  }
}
