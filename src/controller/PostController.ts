import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { IPostInputEditDTO } from "../dtos/PostDTO";

export class PostController {

    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getPosts = async (_req: Request, res: Response) => {
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

    public editPosts = async (req: Request, res: Response) => {
        try {

            const input: IPostInputEditDTO = {
                id: req.params.id,
                content: req.body.content
            }

            const posts = await this.postBusiness.editPost(input)

            res.status(200).send(posts)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {

            const id = req.params.id

            const post = await this.postBusiness.deletePost(id)

            res.status(200).send(post)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }


    public createPosts = async (req: Request, res: Response) => {
        try {

            const input = {
                id: req.body.id,
                creator_id: req.body.creator_id,
                content: req.body.content
            }

            const output = await this.postBusiness.createPost(input)

            res.send(output);

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}