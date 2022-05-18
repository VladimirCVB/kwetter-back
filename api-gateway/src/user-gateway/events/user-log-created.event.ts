export class UserLogCreatedEvent {
  constructor(
    public readonly userName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly fisrtName: string,
    public readonly lastName: string,
  ) {}

  toString() {
    return JSON.stringify({
      userName: this.userName,
      email: this.email,
      password: this.password,
      fisrtName: this.fisrtName,
      lastName: this.lastName,
    });
  }
}
