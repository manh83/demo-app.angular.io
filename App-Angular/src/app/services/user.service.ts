import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interface/interface';
import instance from '../instance/instance';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  createUser(user:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${instance.defaults.baseURL}/api/signup`,user)
  }
}
