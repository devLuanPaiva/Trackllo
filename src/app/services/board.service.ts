import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { IBoard, ITask, IColumn } from '../models';
import { database, ID, Query } from '../../lib/appwrite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly databaseId = environment.DATABASE_ID;
  private readonly BOARD_ID = environment.BOARD_COLLECTION_ID;
  private readonly COLUMNS_ID = environment.COLUMNS_COLLECTION_ID;
  private readonly TASKS_ID = environment.TASKS_COLLECTION_ID;

  constructor() {}

  createBoard(userId: string, columnIds: string[]): Observable<IBoard> {
    return from(
      database.createDocument(this.databaseId, this.BOARD_ID, ID.unique(), {
        userId,
        columns: columnIds,
      })
    ).pipe(
      map(
        (doc) =>
          ({
            id: doc.$id,
            userId: doc['userId'],
            columns: doc['columns'],
          } as IBoard)
      ),
      catchError((error) => {
        console.error('Erro ao criar board:', error);
        throw error;
      })
    );
  }

  createColumn(
    title: 'Todo' | 'In Progress' | 'Done',
    taskIds: string[]
  ): Observable<IColumn> {
    return from(
      database.createDocument(this.databaseId, this.COLUMNS_ID, ID.unique(), {
        title,
        tasks: taskIds, 
      })
    ).pipe(
      map(
        (doc) =>
          ({ id: doc.$id, title: doc['title'], tasks: doc['tasks'] } as IColumn)
      ),
      catchError((error) => {
        console.error('Erro ao criar coluna:', error);
        throw error;
      })
    );
  }

  createTask(
    userId: string,
    title: string,
    description?: string,
    imageUrl?: string
  ): Observable<ITask> {
    return from(
      database.createDocument(this.databaseId, this.TASKS_ID, ID.unique(), {
        userId,
        title,
        description,
        imageUrl,
      })
    ).pipe(
      map(
        (doc) =>
          ({
            id: doc.$id,
            userId: doc['userId'],
            title: doc['title'],
            description: doc['description'],
            image: doc['imageUrl'],
          } as ITask)
      ),
      catchError((error) => {
        console.error('Erro ao criar tarefa:', error);
        throw error;
      })
    );
  }

  getUserBoards(userId: string): Observable<IBoard[]> {
    return from(
      database.listDocuments(this.databaseId, this.BOARD_ID, [
        Query.equal('userId', userId),
      ])
    ).pipe(
      map((res) =>
        res.documents.map(
          (doc) =>
            ({
              id: doc.$id,
              userId: doc['userId'],
              columns: doc['columns'],
            } as IBoard)
        )
      ),
      catchError((error) => {
        console.error('Erro ao buscar boards:', error);
        throw error;
      })
    );
  }
}
