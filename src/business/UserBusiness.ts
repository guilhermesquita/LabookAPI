import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserBusiness {
    public getUser = async (q:string|undefined) => {
       
        if(typeof q !== "string" && typeof q !== "undefined"){
            throw new Error('NÃO ENCONTRADO!')
        }

        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers(q)

        if(usersDB.length < 1){
            throw new Error('Usuário não encontrado!')
        }

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        ))

        return users
    }

    public createUser = async(user: UserDB) => {
        
        // if(typeof user.name === 'string'){
        //     throw newError
        // }


        // const user = 

        // const body: User = {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     password: user.password,
        //     role: user.role,
        //     createdAt: user.created_at
        // }

        // const userDatabase = new UserDatabase
        // const userDB = await userDatabase.insertUser(body)

    }
}