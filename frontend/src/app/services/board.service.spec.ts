import { TestBed } from '@angular/core/testing';
import { BoardService } from './board.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { mockAuthService, mockBoards } from '../mocks';

describe('Board service', () => {
  let service: BoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardService,
        { provide: AuthenticationService, useValue: mockAuthService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BoardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch user boards', () => {
    service.getUserBoards().subscribe((boards) => {
      expect(boards).toEqual(mockBoards);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/boards`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush({ data: mockBoards });
  })
  it('should fetch a board by ID', () => {
    const board = mockBoards[0]
    service.getBoardById(board.id).subscribe((result) => {
      expect(result).toEqual(board)
    })
    const req = httpMock.expectOne(`${environment.API_URL}/boards/${board.id}`);
    expect(req.request.method).toBe('GET');

    req.flush({ data: board });
  })
  it('should create a new board', () => {
    const newBoardTitle = 'Novo Board';

    service.createBoard(newBoardTitle).subscribe((result) => {
      expect(result).toEqual(mockBoards[0]);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/boards`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: newBoardTitle });

    req.flush({ data: mockBoards[0] });
  });
})
