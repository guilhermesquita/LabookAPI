import { PostDatabase } from "../database/PostDatabase"

export class PostBussiness {
    public getPost = async () => {
        const postDB = new PostDatabase()
        const posts = postDB.findPost()

        return posts
    }
}