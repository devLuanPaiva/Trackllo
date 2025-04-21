import { ApiResponse, IBoard } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly api_url = environment.API_URL;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  getUserBoards(): Observable<IBoard[]> {
    return this.http
      .get<ApiResponse<IBoard[]>>(`${this.api_url}/boards`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao buscar projetos')
        )
      );
  }
  getBoardById(id: string): Observable<IBoard> {
    return this.http
      .get<ApiResponse<IBoard>>(`${this.api_url}/boards/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao buscar projeto')
        )
      );
  }
  createBoard(title: string): Observable<IBoard> {
    return this.http
      .post<ApiResponse<IBoard>>(
        `${this.api_url}/boards`,
        { title: title },
        { headers: this.authService.getAuthHeaders() }
      )
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao criar projeto')
        )
      );
  }
  deleteBoard(id: string): Observable<IBoard> {
    return this.http
      .delete<ApiResponse<IBoard>>(`${this.api_url}/boards/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao deletar projeto')
        )
      );
  }
}
