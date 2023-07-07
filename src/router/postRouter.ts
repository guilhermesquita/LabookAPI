import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";

export const postRouter = express.Router()

const postDatabase = new PostDatabase()
const userDatabase = new UserDatabase()

const postController = new PostController(new PostBusiness(postDatabase, userDatabase))

postRouter.get('/', postController.getPosts)
postRouter.post('/', postController.createPosts)
postRouter.put('/:id', postController.editPosts)