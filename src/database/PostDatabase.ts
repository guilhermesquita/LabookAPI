import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async findPost() {
        const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS).select()

        return result
    }
}