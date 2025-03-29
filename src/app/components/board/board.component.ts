import { IBoard, ITask } from '../../models';
import { BOARD_DATA } from './../../constants/boards.constant';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ColumnsComponent } from './columns/columns.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ColumnsComponent],
  templateUrl: './board.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('void => *', [animate('300ms ease-in')]),
      transition('* => void', [animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' }))])
    ])
  ]
})
export class BoardComponent implements OnInit {
  boards: IBoard = BOARD_DATA;
  columnTodo: ITask[] = [];
  columnInProgress: ITask[] = [];
  columnDone: ITask[] = [];
  icons = {
    plus: faPlus,
  }
  constructor() { }

  ngOnInit(): void {
    const todoColumn = this.boards.columns.find(column => column.title === 'Todo');
    const inProgressColumn = this.boards.columns.find(column => column.title === 'In Progress');
    const doneColumn = this.boards.columns.find(column => column.title === 'Done');

    this.columnTodo = todoColumn ? todoColumn.tasks : [];
    this.columnInProgress = inProgressColumn ? inProgressColumn.tasks : [];
    this.columnDone = doneColumn ? doneColumn.tasks : [];
  }

  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
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
