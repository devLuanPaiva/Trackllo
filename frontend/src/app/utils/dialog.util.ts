import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/shared/dialog/dialog.component';
import { Observable } from 'rxjs';

export function openConfirmationDialog(
  dialog: MatDialog,
  message: string
): Observable<boolean> {
  const dialogRef = dialog.open(DialogComponent, {
    data: { message },
  });
  return dialogRef.afterClosed();
}
