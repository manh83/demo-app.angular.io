import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthuService } from './authu.service';
import { IOrder } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/order';

  constructor(private http: HttpClient,private authService:AuthuService ) {}

  addOrder(orderData: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}`, { products: orderData }, { headers });
  }
  
  getAllOrder(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}`,{headers});
  }

  getOneOrder(id: string){
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteOrder(id:string){
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateOrder(order:IOrder){
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.baseUrl}/${order._id}`,order);
  }
}
