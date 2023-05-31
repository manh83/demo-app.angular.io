import { Injectable } from '@angular/core';
import { ICategory } from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import instance from '../instance/instance';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAllCategory():Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${instance.defaults.baseURL}/api/categories`)
  }
  getOneCategory(id: number |string):Observable<ICategory>{
    return this.http.get<ICategory>(`${instance.defaults.baseURL}/api/categories/`+id)
  }
  addCategory(category:ICategory):Observable<ICategory>{
    return this.http.post<ICategory>(`${instance.defaults.baseURL}/api/categories`,category)
  }
  deleteCategory(id:number | string):Observable<ICategory>{
    return this.http.delete<ICategory>(`${instance.defaults.baseURL}/api/categories/`+id)
  }
  updateCategory(category:ICategory):Observable<ICategory>{
    return this.http.put<ICategory>(`${instance.defaults.baseURL}/api/categories/`+category._id,category)
  }
}
