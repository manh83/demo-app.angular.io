import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import instance from '../instance/instance';
import { AuthuService } from './authu.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient,private authService: AuthuService) { }
  getAllCart():Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${instance.defaults.baseURL}/api/cart`, { headers });

  }
  addToCart(productId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { productId };
    return this.http.post(`${instance.defaults.baseURL}/api/cart/add`, body, { headers });
  }
  
  deleleCart(id:string):Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${instance.defaults.baseURL}/api/cart/remove/`+id,{headers})
  }
  
  deleteAllCart(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${instance.defaults.baseURL}/api/cart/removeAll`; // Replace with your API endpoint
    return this.http.delete<any>(url, { headers });
  }
  
}
