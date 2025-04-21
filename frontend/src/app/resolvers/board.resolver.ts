import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IBoard } from '../models';
import { BoardService } from '../services/board.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardResolver implements Resolve<IBoard> {
  constructor(private readonly boardService: BoardService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBoard> {
    const id = route.paramMap.get('id')!;
    return this.boardService.getBoardById(id);
  }
}
