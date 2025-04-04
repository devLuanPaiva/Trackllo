import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { IBoard, ITask, IColumn } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() { }

  createBoard(userId: string, columnIds: string[]): Observable<IBoard> { }

  createColumn(
    title: 'Todo' | 'In Progress' | 'Done',
    taskIds: string[]
  ): Observable<IColumn> { }

  createTask(
    userId: string,
    title: string,
    description?: string,
    imageUrl?: string
  ): Observable<ITask> { }

  getUserBoards(userId: string): Observable<IBoard[]> { }
}
