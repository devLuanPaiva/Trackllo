import { Component, Input, OnInit } from '@angular/core';
import { IBoard, ITask } from '../../../models';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TasksComponent } from '../tasks/tasks.component';
import { ColumnsService } from '../../../services/columns.service';
import { TasksService } from '../../../services/tasks.service';
import { fadeInOut } from '../../../animations';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-columns',
  imports: [CommonModule, FontAwesomeModule, TasksComponent, AlertComponent],
  templateUrl: './columns.component.html',
  animations: [
   fadeInOut
  ],
})
export class ColumnsComponent implements OnInit {
  @Input() board: IBoard = {
    id: '',
    userId: '',
    title: '',
    columns: [],
  };
  columnTodo: ITask[] = [];
  columnInProgress: ITask[] = [];
  columnDone: ITask[] = [];
  idTodo: string = '';
  idInProgress: string = '';
  idDone: string = '';
  errorMessage: string | null = null;
  icons = {
    plus: faPlus,
  };
  constructor(
    private readonly columnService: ColumnsService,
    private readonly taskService: TasksService
  ) {}
  ngOnInit(): void {
    this.loadBoardColumns();
  }

  loadBoardColumns(): void {
    this.columnService.getBoardColumns(this.board.id).subscribe({
      next: (column) => {
        if (column.length === 0) {
          return;
        }
        const todoColumn = column.find((column) => column.title === 'To do');
        const inProgressColumn = column.find(
          (column) => column.title === 'In Progress'
        );
        const doneColumn = column.find((column) => column.title === 'Done');

        this.columnTodo = todoColumn ? todoColumn.tasks : [];
        this.columnInProgress = inProgressColumn ? inProgressColumn.tasks : [];
        this.columnDone = doneColumn ? doneColumn.tasks : [];

        this.idTodo = todoColumn?.id ?? '';
        this.idInProgress = inProgressColumn?.id ?? '';
        this.idDone = doneColumn?.id ?? '';

      },
      error: (err) => (this.errorMessage = err),
    });
  }
  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task: ITask = event.previousContainer.data[event.previousIndex];
      const newColumnID = this.getColumnIdByDropListId(event.container.id);

      if (task && newColumnID && task.columnId !== newColumnID) {
        this.taskService.moveTask(task.id, newColumnID).subscribe({
          next: () => {
            task.columnId = newColumnID;
          },
          error: (err) => (this.errorMessage = err),
        });
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  getConnectedColumns(column: string): string[] {
    if (column === 'Todo') {
      return ['InProgress', 'Done'];
    } else if (column === 'In Progress') {
      return ['Todo', 'Done'];
    } else {
      return ['Todo', 'InProgress'];
    }
  }
  private getColumnIdByDropListId(dropListId: string): string {
    switch (dropListId) {
      case 'Todo':
        return this.idTodo;
      case 'InProgress':
        return this.idInProgress;
      case 'Done':
        return this.idDone;
      default:
        return '';
    }
  }
}
