export class PostUpdatedEvent {
    constructor(
        public readonly text: string,
        public readonly hearts: number,
        public readonly userName: string
    ) {}

    toString(){
        return JSON.stringify({
            text: this.text,
            hearts: this.hearts,
            userName: this.userName
        })
    }
}