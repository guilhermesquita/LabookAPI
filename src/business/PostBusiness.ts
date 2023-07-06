import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { Post } from "../models/Post"

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase
    ) { }

    public getPost = async () => {
        const postsDB = await this.postDatabase.findPost()
        const usersDB = await this.userDatabase.getUsers()

        const creatorPost = (creatorId: string) => {
            const creator = usersDB.find((user) => {
                return creatorId === user.id
            })

            return {
                id: creatorId,
                name: creator.name
            }
        }

        const output = postsDB.map((postDB) => {

            const post = new Post(postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                creatorPost(postDB.creator_id)
            )

            return{
                id: post.getId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreatedAt(),
                updated_at: post.getUpdateAt(),
                creator: post.getCreator()
            }

        })

        return output
    }
}