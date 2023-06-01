import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import instance from '../instance/instance';
@Injectable({
  providedIn: 'root'
})
export class AuthuService {
  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private localStorageKey = 'currentUser';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.localStorageKey);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public setCurrentUser(user: IUser, token: string): void {
    this.currentUserSubject.next(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    localStorage.setItem(this.tokenKey, token);
  }

  public getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.tokenKey);
  }

  public forgotPassword(email: string) {
    return this.http.post<any>(`${instance.defaults.baseURL}/api/forgot-password`, { email });
  }

  changePassword(passwordData: any) {
    return this.http.post<any>(`${instance.defaults.baseURL}/api/changePassword`, passwordData);
  }
}
