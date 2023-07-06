import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";

export const useRouter = express.Router()
const userDatabase = new UserDatabase()
const userController = new UserController(new UserBusiness(userDatabase))

useRouter.get('/', userController.getUsers)
useRouter.post('/', userController.createUser)