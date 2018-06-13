export class PostModel {

    title: String;
    content: String;
    loveIts: number;
    created_at: Date;

    constructor(title: String, content: String, loveIts: number, created_at: Date) {
        this.title = title;
        this.content = content;
        this.loveIts = loveIts;
        this.created_at = created_at;
    }
}