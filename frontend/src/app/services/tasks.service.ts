import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse, ITask } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly api_url = environment.API_URL;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService
  ) {}

  getColumnTasks(columnId: string): Observable<ITask[]> {
    const params = new HttpParams().set('columnId', columnId);

    return this.http
      .get<ApiResponse<ITask[]>>(`${this.api_url}/tasks`, {
        headers: this.authService.getAuthHeaders(),
        params,
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          return throwError(
            () => new Error(error.error?.message || 'Erro ao buscar tasks')
          );
        })
      );
  }
  getTaskById(id: string): Observable<ITask> {
    return this.http
      .get<ApiResponse<ITask>>(`${this.api_url}/tasks/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message || 'Erro ao buscar task')
          );
        })
      );
  }
  createTask(
    data: Pick<ITask, 'title' | 'columnId' | 'description' | 'image'>
  ): Observable<ITask> {
    return this.http
      .post<ApiResponse<ITask>>(`${this.api_url}/tasks`, data, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message || 'Erro ao buscar colunas')
          );
        })
      );
  }
  updateTask(data: ITask): Observable<ITask> {
    return this.http
      .put<ApiResponse<ITask>>(`${this.api_url}/tasks/${data.id}`, data, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message || 'Erro ao buscar colunas')
          );
        })
      );
  }
  deleteTask(id: string): Observable<ITask> {
    return this.http
      .delete<ApiResponse<ITask>>(`${this.api_url}/tasks/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message || 'Erro ao buscar colunas')
          );
        })
      );
  }
  moveTask(id: string, newColumnId: string): Observable<ITask> {
    return this.http
      .patch<ApiResponse<ITask>>(
        `${this.api_url}/tasks/${id}/move`,
        { columnId: newColumnId },
        { headers: this.authService.getAuthHeaders() }
      )
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error fetching boards:', error);
          return throwError(
            () => new Error(error.error?.message || 'Erro ao buscar colunas')
          );
        })
      );
  }
}
