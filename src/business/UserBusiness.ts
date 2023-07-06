// import { UserDatabase } from "../database/UserDatabase"
// import { BadRequestError } from "../errors/BadRequestError"
// import { User } from "../models/User"
// import { UserDB } from "../types"
// import { IUserInputDTO } from "./dtos/UserDTO"

// export class UserBusiness {
//     public getUser = async (q:string|undefined) => {
       
//         if(typeof q !== "string" && typeof q !== "undefined"){
//             throw new Error('NÃO ENCONTRADO!')
//         }

//         const userDatabase = new UserDatabase()
//         const usersDB = await userDatabase.findUsers(q)

//         if(usersDB.length < 1){
//             throw new Error('Usuário não encontrado!')
//         }

//         const users: User[] = usersDB.map((userDB) => new User(
//             userDB.id,
//             userDB.name,
//             userDB.email,
//             userDB.password,
//             userDB.role,
//             userDB.created_at
//         ))

//         return users
//     }

//     public createUser = async(input: IUserInputDTO) => {
        
//         const { id, name, email, password, role } = input

//         const userData = new UserDatabase()
//         const userDBexists = await userData.findUsers(id)

//         if(userDBexists.length){
//             throw new BadRequestError("usuário existente!")
//         }

//         const newUser = new User(
//             id,
//             name,
//             email,
//             password,
//             role,
//             new Date().toISOString()
//         ) 

//         const newUserDB : UserDB = {
//             id: newUser.getId(),
//             name: newUser.getName(),
//             password: newUser.getPassword(),
//             email: newUser.getEmail(),
//             role: newUser.getRole(),
//             created_at: newUser.getCreatedAt()
//         }

//         const userDatabase = new UserDatabase
//         await userDatabase.insertUser(newUserDB)

//         const output = {
//             message: "Produto registrado com sucesso",
//             product: newUser
//         }
        
//         return output

//     }
// }