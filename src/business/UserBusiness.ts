import { UserDatabase } from "../database/UserDatabase"
import { IUserInputDTO } from "../dtos/UserDTO"
import { IUser } from "../entity/user"
import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase
    ) { }

    public getUser = async (q: string | undefined) => {

        if (typeof q !== "string" && typeof q !== "undefined") {
            throw new Error('NÃO ENCONTRADO!')
        }

        if (q) {
            const usersDB:IUser[] = await this.userDatabase.findUsersByName(q)

            const users = usersDB.map((userDB) => {
                const user = new User(
                    userDB.id,
                    userDB.name,
                    userDB.email,
                    userDB.password,
                    userDB.role,
                    userDB.created_at
                )

                const output = {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail()
                }

                return output
            })

            return users
        } else {
            const usersDB:IUser[] = await this.userDatabase.getUsers()

            const users = usersDB.map((userDB) => {
                const user = new User(
                    userDB.id,
                    userDB.name,
                    userDB.email,
                    userDB.password,
                    userDB.role,
                    userDB.created_at
                )
                
                const output = {
                    id: user.getId(),
                    name: user.getName(),
                    emai: user.getEmail()
                }

                return output

            })
            return users
        }
    }

    public createUser = async (input: IUserInputDTO) => {

        const { id, name, email, password, role } = input

        const userData = new UserDatabase()
        const userDBexists = await userData.findUserById(id)

        if (userDBexists) {
            throw new BadRequestError("usuário existente!")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        )

        const newUserDB: IUser = {
            id: newUser.getId(),
            name: newUser.getName(),
            password: newUser.getPassword(),
            email: newUser.getEmail(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        const userDatabase = new UserDatabase
        await userDatabase.insertUser(newUserDB)

        const output = {
            message: "Produto registrado com sucesso",
            product: newUser
        }

        return output

    }
}