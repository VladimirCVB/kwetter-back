export class UserDataUpdatedEvent {
  constructor(
    public firstName: string,
    public lastName: string,
    public school: string,
    public web: string,
    public bio: string,
  ) {}
}
