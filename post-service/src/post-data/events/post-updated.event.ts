export class PostUpdatedEvent {
    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly hearts: number,
        public readonly userName: string,
        public readonly trends: string[]
    ) {} 
}