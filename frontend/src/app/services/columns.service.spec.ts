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
})
