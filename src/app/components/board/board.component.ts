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

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './board.component.html'
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
        event.currentIndex
      );
    }
  }
}
