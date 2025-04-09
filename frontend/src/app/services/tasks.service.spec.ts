import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TasksService } from "./tasks.service";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service";
import { mockAuthService, mockTasks } from "../mocks";
import { provideHttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

describe('Task service', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksService,
        { provide: AuthenticationService, useValue: mockAuthService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch tasks by column ID', () => {
    const columnId = 'column-todo'
    const expected = mockTasks.filter((t) => t.columnId === columnId)
    service.getColumnTasks(columnId).subscribe((tasks) => {
      expect(tasks).toEqual(expected)
    })
    const req = httpMock.expectOne(
      `${environment.API_URL}/tasks?columnId=${columnId}`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush({ data: expected });
  })
  it('should fetch a task by ID', () => {
    const task = mockTasks[0];

    service.getTaskById(task.id).subscribe((result) => {
      expect(result).toEqual(task);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/tasks/${task.id}`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: task });
  });
})
