export interface IUserInputDTO{
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface IUserInputLoginDTO{
    email: string,
    password: string
}

export interface IUserOutputDTO{
    message: string,
    user: {
        id: string,
        name: string
    }
}