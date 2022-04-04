export class PostCreatedEvent {
    constructor(
        public readonly userId: string,
        public readonly userName: string
    ) {}
}