import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {

    constructor(
        private postBusiness: PostBusiness
    ){}

    public getPosts = async(_req: Request, res: Response) => {
        try {
            const posts = await this.postBusiness.getPost()

            res.status(200).send(posts)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }

    public createPosts = async(req: Request, res: Response) => {
        try {
        
        const input = {
            id: req.params.id,
            creator_id: req.params.creator_id,
            content: req.params.content
        }

        const posts = await this.postBusiness.createPost(input)

        return posts

        } catch (error) {
            
        }
    }
}