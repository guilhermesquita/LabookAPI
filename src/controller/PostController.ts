import { Request, Response } from "express";
import { PostBussiness } from "../business/PostBusiness";

export class PostController {
    public getPosts = async(req: Request, res: Response) => {
        try {
            const postDb = new PostBussiness()
            const posts = await postDb.getPost()

            res.status(200).send(posts)
        } catch (error) {
            console.log(error)

            if(req.statusCode === 200 ){
                res.status(500)
            }
        }
    }
}