import { ApiResponse, IBoard } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly api_url = environment.API_URL;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService
  ) {}

  getUserBoards(): Observable<IBoard[]> {
    return this.http
      .get<ApiResponse<IBoard[]>>(`${this.api_url}/boards`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Erro ao buscar boards')
          );
        })
      );
  }
  getBoardById(id: string): Observable<IBoard> {
    return this.http
      .get<ApiResponse<IBoard>>(`${this.api_url}/boards/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching board:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Erro ao buscar board')
          );
        })
      );
  }
  createBoard(title: string): Observable<IBoard> {
    return this.http
      .post<ApiResponse<IBoard>>(
        `${this.api_url}/boards`,
         {title: title},
        { headers: this.authService.getAuthHeaders() }
      )
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error creating board:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Erro ao criar board')
          );
        })
      );
  }
  deleteBoard(id: string): Observable<IBoard> {
    return this.http
      .delete<ApiResponse<IBoard>>(`${this.api_url}/boards/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error deleting board:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Erro ao deletar board')
          );
        })
      );
  }
}
