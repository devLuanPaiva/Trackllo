import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-board-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  @Output() create = new EventEmitter<string>();
  boardForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.boardForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.boardForm.valid) {
      const title = this.boardForm.value.title;
      this.create.emit(title);
      this.boardForm.reset();
    }
  }
}
