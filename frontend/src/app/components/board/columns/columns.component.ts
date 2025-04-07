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
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { BoardService } from '../../../services/board.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { TasksComponent } from '../tasks/tasks.component';
import { ColumnsService } from '../../../services/columns.service';

@Component({
  selector: 'app-columns',
  imports: [CommonModule, FontAwesomeModule, TasksComponent],
  templateUrl: './columns.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('void => *', [animate('300ms ease-in')]),
      transition('* => void', [
        animate(
          '200ms ease-out',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
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
  icons = {
    plus: faPlus,
  };
  constructor(
    private readonly authService: AuthenticationService,
    private readonly boardService: BoardService,
    private readonly columnService: ColumnsService
  ) {}
  ngOnInit(): void {
    this.loadBoardColumns();
  }

  loadBoardColumns(): void {
    this.columnService.getBoardColumns(this.board.id).subscribe({
      next: (column) => {
        if (column.length === 0) {
          console.error('Not found!');
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
      },
      error: (err) => console.error('Erro ao buscar boards:', err),
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
}
