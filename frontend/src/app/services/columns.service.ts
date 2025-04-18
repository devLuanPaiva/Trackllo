import { ApiResponse, IColumn } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  private readonly api_url = environment.API_URL;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService
  ) {}
  getBoardColumns(boardId: string): Observable<IColumn[]> {
    return this.http
      .get<ApiResponse<IColumn[]>>(`${this.api_url}/columns/board/${boardId}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Erro ao buscar colunas')
          );
        })
      );
  }
  getColumnById(columnId: string): Observable<IColumn> {
    return this.http
      .get<ApiResponse<IColumn>>(`${this.api_url}/columns/${columnId}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message ?? 'Erro ao buscar coluna')
          );
        })
      );
  }
}
