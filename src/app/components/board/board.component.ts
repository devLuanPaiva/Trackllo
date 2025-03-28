import { IBoard, ITask } from '../../models';
import { BOARD_DATA } from './../../constants/boards.constant';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag,],
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
}
