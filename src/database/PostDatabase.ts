import { IPostInputEditDTO } from "../dtos/PostDTO";
import { IPost } from "../entity/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async findPost() {
        const result: IPost[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS).select()

        return result
    }

    public async editPost(input: IPostInputEditDTO) {

        const updatePost = {
            content: input.content
        }

        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS).update(updatePost).where({id: input.id})
    }

    public async deletePost(id: string) {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS).del().where({id: id})
    }

    public async findPostById(id: string) {
        const [postDB]: IPost[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }
    public async insertPost(newPostDB: IPost) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }
}