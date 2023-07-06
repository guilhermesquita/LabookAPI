import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsersByName(q: string | undefined) {
        let usersDB
        
        const result: UserDB[] = await BaseDatabase
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
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB
    }

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

    public async editUser(update: UserDB, id: string) {

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(update)
            .where({ id: id })
    }
}
