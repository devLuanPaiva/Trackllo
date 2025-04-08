import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../models';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tasks.component.html',
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
export class TasksComponent {
  @Input() columnTitle: string = '';
  @Input() columnId: string = ''
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
  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TasksService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      image: ['', [Validators.pattern(/https?:\/\/.+/)]]
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  createTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const payload: Pick<ITask, "title" | "description" | "image" | "columnId"> = {
        columnId: this.columnId,
        title: formValue.title,
        description: formValue.description
      };

      if (formValue.image?.trim()) {
        payload.image = formValue.image;
      }

      this.taskService.createTask(payload).subscribe({
        next: (newTask) => {
          this.columnTasks.push(newTask);
          this.taskForm.reset();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Erro ao criar task:', err);
        }
      });
    }
  }

  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    this.taskDropped.emit(event);
  }
}
