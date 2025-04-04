import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IUser } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly api_url = environment.API_URL;

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<{ user: IUser; token: string }>(`${this.api_url}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
        }),
        map((response) => response.user),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Login failed')
          );
        })
      );
  }

  register(name: string, email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.api_url}/users`, { name, email, password })
      .pipe(
        tap((user) => {
          this.login(email, password).subscribe();
        }),
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Registration failed')
          );
        })
      );
  }

  logout(): Observable<void> {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return of(undefined);
  }

  getLoggedUser(): IUser | null {
    if (typeof window !== 'undefined' && sessionStorage.getItem('user')) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
