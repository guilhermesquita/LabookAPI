import { IUser } from "../entity/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsersByName(q: string | undefined) {
        let usersDB
        
        const result: IUser[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where("name", "LIKE", `%${q}%`)

        usersDB = result
        
        return usersDB
    }

    public async getUsers(){
        const result = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS).select()

        return result
    }

    public async findUserById(id: string) {
        const [userDB]: IUser[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB
    }

    public async findUserByEmailandPassword(email: string, password: string) {
        const [userDB]: IUser[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS).where({ email }).where({ password })

        return userDB
    }

    public async insertUser(newUserDB: IUser) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

    public async editUser(update: IUser, id: string) {

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(update)
            .where({ id: id })
    }
}
