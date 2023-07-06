import { IPost } from "../entity/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async findPost() {
        const result: IPost[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS).select()

        return result
    }
}