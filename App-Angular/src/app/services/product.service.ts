import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interface/interface';
import { Observable } from 'rxjs';
import instance from '../instance/instance';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProduct(page: number, limit: number): Observable<any> {
    const url = `${instance.defaults.baseURL}/api/products?_page=${page}&_limit=${limit}`;
    return this.http.get<any>(url);
  }
  
  getOne(id: string | number): Observable<IProduct> {
    return this.http.get<IProduct>(
      `${instance.defaults.baseURL}/api/products/` + id
    );
  }
  addProduct(product: IProduct): Observable<IProduct> {
    // const token = JSON.parse(localStorage.getItem("token")?? "")
    return this.http.post<IProduct>(`${instance.defaults.baseURL}/api/products`,product)
  }
  
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `${instance.defaults.baseURL}/api/products/` + product._id,
      product
    );
  }
  deleteProduct(id: number | string): Observable<IProduct> {
    return this.http.delete<IProduct>(
      `${instance.defaults.baseURL}/api/products/` + id
    );
  }
}
