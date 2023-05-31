import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import { IProduct } from "../interface/interface"
import {Observable} from "rxjs"
import instance from "../instance/instance"
@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor (private http: HttpClient){}
    getAllProduct():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`${instance.defaults.baseURL}/api/products`)
    }
    getOne(id: string | number):Observable<IProduct>{
      return this.http.get<IProduct>(`${instance.defaults.baseURL}/api/products/`+ id)
    }
    addProduct(product: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(`${instance.defaults.baseURL}/api/products`, product)
      }
      updateProduct(product: IProduct): Observable<IProduct> {
        return this.http.patch<IProduct>(`${instance.defaults.baseURL}/api/products/`+ product._id,product)
      }
      deleteProduct(id: number | string): Observable<IProduct> {
        return this.http.delete<IProduct>(`${instance.defaults.baseURL}/api/products/`+ id)
      }
}

