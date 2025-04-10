import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TasksService } from "./tasks.service";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service";
import { mockAuthService, mockTasks } from "../mocks";
import { provideHttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ITask } from "../models";

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
  it('should create a task', () => {
    const newTask: Pick<ITask, 'title' | 'description' | 'columnId' | 'image'> = {
      title: 'Nova tarefa',
      description: 'Descrição nova',
      columnId: 'column-todo',
      image: 'https://via.placeholder.com/200',
    };

    const createdTask: ITask = {
      ...newTask,
      id: 'task-4',
      userId: 'user-3',
    };

    service.createTask(newTask).subscribe((result) => {
      expect(result).toEqual(createdTask);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush({ data: createdTask });
  });
  it('should update a task', () => {
    const updatedTask: ITask = {
      ...mockTasks[1],
      title: 'Revisar código atualizado',
    };

    service.updateTask(updatedTask).subscribe((result) => {
      expect(result).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/tasks/${updatedTask.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ data: updatedTask });
  });
  it('should delete a task', () => {
    const taskId = mockTasks[0].id;

    service.deleteTask(taskId).subscribe((result) => {
      expect(result).toEqual(mockTasks[0]);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ data: mockTasks[0] });
  });
  it('should move a task to a new column', () => {
    const taskId = mockTasks[1].id;
    const newColumnId = 'column-done';

    const movedTask: ITask = {
      ...mockTasks[1],
      columnId: newColumnId,
    };

    service.moveTask(taskId, newColumnId).subscribe((result) => {
      expect(result).toEqual(movedTask);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/tasks/${taskId}/move`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ columnId: newColumnId });
    req.flush({ data: movedTask });
  });
})
