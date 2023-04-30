import { PostDatabase } from "../database/PostDatabase"

export class PostBussiness {
    public getPost = async () => {
        const postsDB = new PostDatabase()
        const posts = await postsDB.findPost()

        return posts
    }
}