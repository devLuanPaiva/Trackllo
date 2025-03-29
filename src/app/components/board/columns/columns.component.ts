import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../models';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-columns',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
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
export class ColumnsComponent {
  @Input() columnTitle: string = '';
  @Input() columnTasks: ITask[] = [];
  @Input() id: string = '';
  @Input() connectedTo: string[] = [];
  @Input() colorTask: string = 'blue';
  @Output() taskDropped = new EventEmitter<CdkDragDrop<ITask[]>>();

  icons = {
    plus: faPlus,
    xmark: faXmark,
  };
  showForm: boolean = false;
  taskForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: ITask = {
        id: crypto.randomUUID(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        image: this.taskForm.value.image || undefined,
        userId: 'default-user',
      };

      this.columnTasks.push(newTask);
      this.taskForm.reset();
      this.showForm = false;
    }
  }

  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    this.taskDropped.emit(event);
  }
}
