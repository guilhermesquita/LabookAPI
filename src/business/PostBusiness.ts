import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { IPostInputDTO } from "../dtos/PostDTO"
import { IPost } from "../entity/post"
import { BadRequestError } from "../errors/BadRequestError"
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

            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                creatorPost(postDB.creator_id)
            )

            console.log(post.getCreator())

            const resultPost = {
                id: post.getId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreatedAt(),
                updated_at: post.getUpdateAt(),
                creator: post.getCreator()
            }

            return resultPost;
        })

        return output
    }

    public createPost = async (input: IPostInputDTO) => {
        try {
            const { id, creator_id, content } = input

            const postDbExists = await this.postDatabase.findPostById(id)
            const userDb = await this.userDatabase.getUsers()

            if (postDbExists) {
                throw new BadRequestError("usuário existente!")
            }

            const posts = userDb.map(async (userDB) => {
                const newPost = new Post(
                    id,
                    content,
                    undefined,
                    undefined,
                    new Date().toISOString(),
                    new Date().toISOString(),
                    { id: creator_id, name: userDB.name }
                )

                const newPostDB: IPost = {
                    id: newPost.getId(),
                    content: newPost.getContent(),
                    likes: newPost.getLikes(),
                    dislikes: newPost.getDislikes(),
                    created_at: newPost.getCreatedAt(),
                    updated_at: newPost.getUpdateAt(),
                    creator_id: newPost.getCreator().id,
                }

                await this.postDatabase.insertPost(newPostDB);

                const output = {
                    message: 'Created',
                    content: newPost.getId()
                }

                return output
            })

            return posts

            // const newPost = new Post(
            //     id,
            //     content,
            //     undefined,
            //     undefined,
            //     new Date().toISOString(),
            //     new Date().toISOString(),
            //     {id: creator_id, name: 'cds'}
            // )

        } catch (error) {

        }
    }
}