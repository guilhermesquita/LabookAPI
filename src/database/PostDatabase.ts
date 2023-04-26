import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async findPost() {
        const result = BaseDatabase.connection('posts')
    }
}