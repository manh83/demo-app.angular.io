import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import { IProduct } from "../interface/interface"
import {Observable} from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor (private http: HttpClient){}
    getAllProduct():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`http://localhost:3000/products`)
    }
    getOne(id: number | string):Observable<IProduct>{
        return this.http.get<IProduct>(`http://localhost:3000/products/${id}`)
    }
}