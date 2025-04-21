import { TestBed } from '@angular/core/testing';
import { BoardResolver } from './board.resolver';
import { BoardService } from '../services/board.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { mockBoards } from '../mocks';

describe('BoardResolver', () => {
  let resolver: BoardResolver;
  let boardServiceSpy: jasmine.SpyObj<BoardService>;

  beforeEach(() => {
    boardServiceSpy = jasmine.createSpyObj('BoardService', ['getBoardById']);
    TestBed.configureTestingModule({
      providers: [
        BoardResolver,
        { provide: BoardService, useValue: boardServiceSpy },
      ],
    });
    resolver = TestBed.inject(BoardResolver);
  });
  it('should resolve the board by route ID', () => {
    const routeSnapshot = {
      paramMap: new Map([['id', '123']]),
    } as unknown as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;

    boardServiceSpy.getBoardById.and.returnValue(of(mockBoards[0]));

    resolver.resolve(routeSnapshot, stateSnapshot).subscribe((board) => {
      expect(board).toEqual(mockBoards[0]);
      expect(boardServiceSpy.getBoardById).toHaveBeenCalledWith('123');
    });
  });
});
