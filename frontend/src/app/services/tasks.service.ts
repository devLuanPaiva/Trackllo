import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError, map, Observable } from 'rxjs';
import { ApiResponse, ITask } from '../models';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly api_url = environment.API_URL;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly errorHandler: ErrorHandlerService
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
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao buscar tarefas')
        )
      );
  }
  getTaskById(id: string): Observable<ITask> {
    return this.http
      .get<ApiResponse<ITask>>(`${this.api_url}/tasks/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao buscar tarefa')
        )
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
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao criar tarefa')
        )
      );
  }
  updateTask(data: ITask): Observable<ITask> {
    return this.http
      .put<ApiResponse<ITask>>(`${this.api_url}/tasks/${data.id}`, data, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao buscar coluna')
        )
      );
  }
  deleteTask(id: string): Observable<ITask> {
    return this.http
      .delete<ApiResponse<ITask>>(`${this.api_url}/tasks/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data),
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao deletar tarefa')
        )
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
        catchError((error) =>
          this.errorHandler.handle(error, 'Erro ao mover tarefa')
        )
      );
  }
}
