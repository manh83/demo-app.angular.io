import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interface/interface';
@Injectable({
  providedIn: 'root'
})
export class AuthuService {
  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private localStorageKey = 'currentUser';

  constructor() {
    const storedUser = localStorage.getItem(this.localStorageKey);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public setCurrentUser(user: IUser): void {
    this.currentUserSubject.next(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
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
  }
}
