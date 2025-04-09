import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { ColumnsService } from "./columns.service";
import { TestBed } from "@angular/core/testing";
import { mockAuthService, mockColumns } from "../mocks";
import { AuthenticationService } from "./authentication.service";
import { provideHttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

describe('Column service', () => {
  let service: ColumnsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ColumnsService,
        { provide: AuthenticationService, useValue: mockAuthService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ColumnsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should fetch columns of a board', () => {
    const boardId = 'board-1';

    service.getBoardColumns(boardId).subscribe((columns) => {
      expect(columns).toEqual(mockColumns);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/columns/board/${boardId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush({ data: mockColumns });
  })
  it('should fetch a column by ID', () => {
    const column = mockColumns[0]
    service.getColumnById(column.id).subscribe((result) => {
      expect(result).toEqual(column)
    })
    const req = httpMock.expectOne(`${environment.API_URL}/columns/${column.id}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush({ data: column });
  })
  it('should handle error when fetching board columns', () => {
    service.getBoardColumns('board-1').subscribe({
      error: (err) => {
        expect(err.message).toBe('Erro ao buscar colunas');
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}/columns/board/board-1`);
    req.flush(
      { message: 'Erro ao buscar colunas' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error when fetching column by ID', () => {
    service.getColumnById('column-todo').subscribe({
      error: (err) => {
        expect(err.message).toBe('Erro ao buscar coluna');
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}/columns/column-todo`);
    req.flush(
      { message: 'Erro ao buscar coluna' },
      { status: 404, statusText: 'Not Found' }
    );
  });
})
