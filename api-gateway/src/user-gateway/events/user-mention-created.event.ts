export class UserMentionCreatedEvent {
    constructor(
        public readonly userId: string,
        public readonly userMentions: string[],
        public readonly postId: string
    ) {}

    toString(){
        return JSON.stringify({
            userId: this.userId,
            userMentions: this.userMentions,
            postId: this.postId
        })
    }
}