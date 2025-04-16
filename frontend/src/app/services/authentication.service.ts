import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IUser } from '../models';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly api_url = environment.API_URL;

  constructor(private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<{ user: IUser; token: string }>(`${this.api_url}/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }),
        map((response) => response.data.user),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Login failed')
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
            () => new Error(error.error?.message ?? 'Registration failed')
          );
        })
      );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && sessionStorage) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  getLoggedUser(): IUser | null {
    if (typeof window !== 'undefined' && sessionStorage.getItem('user')) {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  logout(): Observable<void> {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.router.navigate(['/autenticacao']);
    }
    return of(undefined);
  }


  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    const headersConfig: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    return new HttpHeaders(headersConfig);
  }
}
