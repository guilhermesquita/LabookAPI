import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";

export const postRouter = express.Router()

const postDatabase = new PostDatabase()
const userDatabase = new UserDatabase()
const postBusiness = new PostBusiness(postDatabase, userDatabase)

const postController = new PostController(postBusiness)

postRouter.get('/', postController.getPosts)
