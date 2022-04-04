export class PostCreatedEvent {
    constructor(
        public readonly postId: string,
        public readonly userId: string,
        public readonly userName: string
    ) {}

    toString(){
        return JSON.stringify({
            postId: this.postId,
            userId: this.userId,
            userName: this.userName
        })
    }
}