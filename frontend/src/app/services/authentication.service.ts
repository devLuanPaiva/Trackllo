import { Injectable } from '@angular/core';
import { account, ID } from '../../lib/appwrite';
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
    return from(account.get()).pipe(
      switchMap(user => {
        if (user) {
          return from(Promise.resolve(user));
        }
        return from(account.createEmailPasswordSession(email, password));
      }),
      switchMap(() => from(account.get())),
      map(user => ({
        id: user.$id,
        name: user.name,
        email: user.email
      }) as IUser),
      tap(user => {
        this.loggedInUser = user;
        sessionStorage.setItem('user', JSON.stringify(user));
      }),
      catchError(error => {
        console.error('Erro ao fazer login:', error);
        throw error;
      })
    );
  }



  register(email: string, password: string, name: string): Observable<IUser> {
    return from(account.create(ID.unique(), email, password, name)).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  logout(): Observable<void> {
    return from(account.deleteSession('current')).pipe(
      tap(() => {
        this.loggedInUser = null;
        sessionStorage.removeItem('user');
      }),
      catchError(error => {
        console.error('Erro ao fazer logout:', error);
        throw error;
      }),
      map(() => undefined)
    );
  }

  getLoggedUser(): IUser | null {
    if (typeof window !== 'undefined' && sessionStorage.getItem('user')) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}
