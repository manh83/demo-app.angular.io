export interface IProduct{
    id?: string,
    name: string,
    price: number,
    desc: string,
    imgUrl: string
}

export interface IUser {
    id?: string,
    username?: string,
    email:string,
    password: string,
    confirmPassword: string
}