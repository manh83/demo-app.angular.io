export interface IProduct{
    _id?: string,
    name: string,
    price: number,
    description?: string,
    imgUrl: string,
    categoryId: string
}

export interface IUser {
    id?: string,
    name: string,
    email:string,
    password: string,
    confirmPassword: string
}

export interface ICategory{
    _id?:string,
    name: string
}