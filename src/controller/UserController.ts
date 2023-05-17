import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { BaseError } from "../errors/BaseError"


export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined


            const userDb = new UserBusiness()
            const users = await userDb.getUser(q)

            res.status(200).send(users)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,    
            }

            // if (typeof id !== "string") {
            //     res.status(400)
            //     throw new Error("'id' deve ser string")
            // }

            // if (typeof name !== "string") {
            //     res.status(400)
            //     throw new Error("'name' deve ser string")
            // }

            // if (typeof email !== "string") {
            //     res.status(400)
            //     throw new Error("'email' deve ser string")
            // }

            // if (typeof password !== "string") {
            //     res.status(400)
            //     throw new Error("'password' deve ser string")
            // }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.createUser(input)

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

    // public editUser = async (req: Request, res: Response) => {
    //     try {
    //         const id = req.params.id

    //         const { newId, newName, newEmail, newPassword } = req.body

    //         const newUser = new UserDatabase()

    //         const existUser = await newUser.findUserById(id)

    //         if (!existUser) {
    //             res.status(400)
    //             throw new Error("Usuário não encontrado!")
    //         }

    //         const update:UserDB = {
    //             id: newId,
    //             name: newName,
    //             email: newEmail,
    //             password: newPassword,
    //             created_at: new Date().toISOString()
    //         }

    //         await newUser.editUser(update, id)

    //     } catch (error) {
    //         console.log(error)

    //         if (req.statusCode === 200) {
    //             res.status(500)
    //         }

    //         if (error instanceof Error) {
    //             res.send(error.message)
    //         } else {
    //             res.send("Erro inesperado")
    //         }
    //     }
    // }
}