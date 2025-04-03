import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedInUser!: IUser | null;

  constructor() { }

  login(email: string, password: string): Observable<IUser> {

  }

  register(email: string, password: string, name: string): Observable<IUser> {

  }

  logout(): Observable<void> {

  }

  getLoggedUser(): IUser | null {
    if (typeof window !== 'undefined' && sessionStorage.getItem('user')) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}
