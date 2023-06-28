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

export interface IOrder{
    _id?:string,
    productId?: string,
    status: string
}

export interface ICart{
    _id?:string,
    productId: any,
    quantity?: number
    total?: number
    selected?: boolean
}