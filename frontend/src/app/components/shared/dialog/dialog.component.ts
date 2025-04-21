import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fadeDialog } from '../../../animations';
@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  animations: [fadeDialog],
})
export class DialogComponent {
  @Input() message: string = 'Tem certeza?';
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    if (data?.message) this.message = data.message;
  }
  onClick(value: boolean) {
    this.confirmed.emit(value);
    this.dialogRef.close(value);
  }
}
