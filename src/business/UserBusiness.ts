import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"

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
}