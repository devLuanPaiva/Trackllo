import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsComponent } from './columns.component';
import { ColumnsService } from '../../../services/columns.service';
import { TasksService } from '../../../services/tasks.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockBoards, mockColumns, mockTasks } from '../../../mocks';

describe('ColumnsComponent', () => {
  let component: ColumnsComponent;
  let fixture: ComponentFixture<ColumnsComponent>;
  let mockColumnsService: jasmine.SpyObj<ColumnsService>;
  let mockTasksService: jasmine.SpyObj<TasksService>;

  beforeEach(async () => {
    mockColumnsService = jasmine.createSpyObj('ColumnsService', [
      'getBoardColumns',
    ]);
    mockTasksService = jasmine.createSpyObj('TasksService', ['moveTask']);

    await TestBed.configureTestingModule({
      imports: [ColumnsComponent, BrowserAnimationsModule],
      providers: [
        { provide: ColumnsService, useValue: mockColumnsService },
        { provide: TasksService, useValue: mockTasksService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnsComponent);
    component = fixture.componentInstance;
    component.board = mockBoards[0];
  });
  it('should load board columns on init', () => {
    mockColumnsService.getBoardColumns.and.returnValue(of(mockColumns));
    fixture.detectChanges();
    expect(component.columnTodo.length).toBe(1);
    expect(component.columnInProgress.length).toBe(1);
    expect(component.columnDone.length).toBe(1);
  });
  it('should move task inside same column', () => {
    component.columnTodo = [mockTasks[0], mockTasks[1]];
    const event: any = {
      previousContainer: { data: component.columnTodo },
      container: { data: component.columnTodo },
      previousIndex: 0,
      currentIndex: 1,
    };
    component.onMoveColumnTask(event);
    expect(component.columnTodo[1].id).toBe(mockTasks[0].id);
  });
});
