import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { IBoard, ITask } from '../models';
import { database, ID } from '../../lib/appwrite';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly databaseId = environment.DATABASE_ID;
  private readonly collectionId = environment.BOARD_COLLECTION_ID;

  constructor() { }
  createBoard(userId: string, title: string): Observable<IBoard> {
    const board = {
      userId,
      title,
      columns: [
        { id: ID.unique(), title: 'Todo', tasks: [] },
        { id: ID.unique(), title: 'In Progress', tasks: [] },
        { id: ID.unique(), title: 'Done', tasks: [] },
      ]
    };
    const permissions = [
      `read("user:${userId}")`,
      `write("user:${userId}")`,
      `update("user:${userId}")`,
      `delete("user:${userId}")`
    ];

    return from(database.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(),
      board,
      permissions
    )).pipe(
      map(doc => doc as unknown as IBoard),
      catchError(error => {
        console.error('Erro ao criar board:', error);
        throw error;
      })
    );
  }

  getBoards(userId: string): Observable<IBoard[]> {
    return from(database.listDocuments(this.databaseId, this.collectionId, [
      `equal("userId", "${userId}")`
    ])).pipe(
      map(response => response.documents as unknown as IBoard[]),
      catchError(error => {
        console.error('Erro ao buscar boards:', error);
        throw error;
      })
    );
  }

  addTask(boardId: string, columnId: string, task: ITask): Observable<IBoard> {
    return this.getBoard(boardId).pipe(
      map(board => {
        const column = board.columns.find(col => col.id === columnId);
        if (column) {
          column.tasks.push({ ...task, id: ID.unique() });
        }
        return board;
      }),
      switchMap(updatedBoard => from(database.updateDocument(this.databaseId, this.collectionId, boardId, updatedBoard))),
      map(doc => doc as unknown as IBoard),
      catchError(error => {
        console.error('Erro ao adicionar task:', error);
        throw error;
      })
    );
  }

  getBoard(boardId: string): Observable<IBoard> {
    return from(database.getDocument(this.databaseId, this.collectionId, boardId)).pipe(
      map(doc => doc as unknown as IBoard),
      catchError(error => {
        console.error('Erro ao obter board:', error);
        throw error;
      })
    );
  }
}
