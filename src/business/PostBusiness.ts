import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"

export class PostBussiness {
    public getPost = async () => {
        const postsDatabase = new PostDatabase()
        const postsDB = await postsDatabase.findPost()

        const post: Post[] = postsDB.map((postDB)=> new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.updated_at,
            postDB.created_at
        ))

        return post
    }
}