import { Request, Response } from "express";
import { PostBussiness } from "../business/PostBusiness";

export class PostController {
    public getPosts = async(req: Request, res: Response) => {
        try {
            const postDb = new PostBussiness()
            const posts = await postDb.getPost()

            res.send(posts)
        } catch (error) {
            throw new Error('Error')
        }
    }
}