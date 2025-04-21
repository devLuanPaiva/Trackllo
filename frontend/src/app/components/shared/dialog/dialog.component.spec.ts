import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DialogComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Custom message' } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should display the custom message sent via MAT_DIALOG_DATA', () => {
    const messageEl = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(messageEl.textContent).toContain('Custom message');
  });
  it('should output "false" and close the dialog when clicking "não"', () => {
    spyOn(component.confirmed, 'emit');
    const noButton = fixture.debugElement.query(By.css('button')).nativeElement;
    noButton.click();
    fixture.detectChanges();
    expect(component.confirmed.emit).toHaveBeenCalledWith(false);
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
