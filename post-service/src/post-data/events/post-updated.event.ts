export class PostUpdatedEvent {
    constructor(
        public readonly text: string,
        public readonly hearts: number,
        public readonly userName: string
    ) {} 
}