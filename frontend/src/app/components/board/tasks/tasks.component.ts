import { ITask } from '../../../models';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../animations';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../../services/tasks.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createTaskForm, openConfirmationDialog } from '../../../utils';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { faPlus, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder,FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-tasks',
  imports: [CommonModule, CdkDropList, CdkDrag, FontAwesomeModule, FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './tasks.component.html',
  animations: [fadeInOut],
})
export class TasksComponent {
  @Input() columnTitle: string = '';
  @Input() columnId: string = '';
  @Input() columnTasks: ITask[] = [];
  @Input() id: string = '';
  @Input() connectedTo: string[] = [];
  @Input() colorTask: string = 'blue';
  @Output() taskDropped = new EventEmitter<CdkDragDrop<ITask[]>>();
  errorMessage: string | null = null;
  successMessage: string | null = null;
  icons = {
    plus: faPlus,
    xmark: faXmark,
    trash: faTrash,
  };
  showForm: boolean = false;
  taskForm: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TasksService,
    private readonly dialog: MatDialog
  ) {
    this.taskForm = createTaskForm(this.fb);
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  createTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const payload: Pick<ITask,'title' | 'description' | 'image' | 'columnId'> = {
        columnId: this.columnId,
        title: formValue.title,
        description: formValue.description,
      };

      if (formValue.image?.trim()) {
        payload.image = formValue.image;
      }

      this.taskService.createTask(payload).subscribe({
        next: (newTask) => {
          this.successMessage = 'Tarefa criada com sucesso!';
          this.columnTasks.push(newTask);
          this.taskForm.reset();
          this.showForm = false;
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  onMoveColumnTask(event: CdkDragDrop<ITask[]>) {
    this.taskDropped.emit(event);
  }
  onDeleteTask(taskId: string) {
    openConfirmationDialog(
      this.dialog,
      'Deseja realmente excluir esta tarefa?'
    ).subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(taskId).subscribe({
          next: () => {
            this.successMessage = 'Tarefa deletada com sucesso!';
            this.columnTasks = this.columnTasks.filter(
              (task) => task.id !== taskId
            );
          },
          error: (err) => (this.errorMessage = err),
        });
      }
    });
  }
}
