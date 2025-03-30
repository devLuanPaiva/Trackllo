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
import { BoardService } from '../../../services/board.service';
import { AuthenticationService } from '../../../services/authentication.service';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly boardService: BoardService
  ) {
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
      const userId = this.authService.getLoggedUser()?.id;
      const newTask: ITask = {
        id: crypto.randomUUID(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        image: this.taskForm.value.image || undefined,
        userId: userId!,
      };

      this.columnTasks.push(newTask);
      this.taskForm.reset();
      this.showForm = false;
      this.boardService
        .createTask(userId!, newTask.title, newTask.description, newTask.image)
        .subscribe({
          next: (task) => console.log('Task created:', task),
          error: (error) => console.error('Error creating task:', error),
        });
    }
  }

  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    this.taskDropped.emit(event);
  }
}
