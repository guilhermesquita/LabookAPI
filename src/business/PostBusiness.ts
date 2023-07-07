import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { IPostInputDTO, IPostInputEditDTO } from "../dtos/PostDTO"
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
        const { id, creator_id, content } = input

        const postDBexists = await this.postDatabase.findPostById(id)
        const usersDb = await this.userDatabase.getUsers()

        function findNameCreator(creator_id: string){
            const user = usersDb.find((userDb)=>{
                return userDb === creator_id
            })

            return user
        }


        if (postDBexists) {
            throw new BadRequestError("postagem existente!")
        }

        const newPost = new Post(
            id,
            content,
            undefined,
            undefined,
            new Date().toISOString(),
            new Date().toISOString(),
            {
                id: creator_id,
                name: findNameCreator(creator_id)
            }
        )

        const newPostDB: IPost = {
            id: newPost.getId(),
            content: newPost.getContent(),
            created_at: newPost.getCreatedAt(),
            creator_id: newPost.getCreator().id,
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            updated_at: newPost.getUpdateAt()
        }

        await this.postDatabase.insertPost(newPostDB)

        return {
            message: 'Postagem criada!',
            id_post: newPost.getId()
        }
    }

    public editPost = async (input:IPostInputEditDTO) => {

        const postExists = await this.postDatabase.findPostById(input.id)
        
        if(!postExists) {
            throw new BadRequestError('post not found')
        }

        await this.postDatabase.editPost(input)

        return {
            content: input.content
        }
    }
}