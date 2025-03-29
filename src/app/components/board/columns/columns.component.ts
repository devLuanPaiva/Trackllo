import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../models';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-columns',
  imports: [CommonModule, CdkDropList, CdkDrag, FontAwesomeModule],
  templateUrl: './columns.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('void => *', [animate('300ms ease-in')]),
      transition('* => void', [animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' }))])
    ])
  ]
})
export class ColumnsComponent {
  @Input() columnTitle: string = '';
  @Input() columnTasks: ITask[] = [];
  @Input() id: string = ''; 
  @Input() connectedTo: string[] = [];
  @Input() colorTask: string = 'blue';
  @Output() taskDropped = new EventEmitter<CdkDragDrop<ITask[]>>();

  icons = {
    plus: faPlus,
  };

  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    this.taskDropped.emit(event);
  }
}
