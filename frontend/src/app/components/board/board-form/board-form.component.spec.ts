import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardFormComponent } from './board-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('BoardForm component', () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, BoardFormComponent, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        TranslateStore
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should have a form with title control', () => {
    expect(component.boardForm.contains('title')).toBeTrue();
  });
  it('should make the title control required', () => {
    const control = component.boardForm.get('title');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });
  it('should disable the submit button if the form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });
  it('should enable the submit button when the form is valid', () => {
    component.boardForm.get('title')?.setValue('New board');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeFalse();
  });
  it('should emit the board title and reset the form on submit', () => {
    spyOn(component.create, 'emit');
    const testTitle = 'My new board';

    component.boardForm.get('title')?.setValue(testTitle);
    fixture.detectChanges();

    component.onSubmit();

    expect(component.create.emit).toHaveBeenCalledWith(testTitle);
    expect(component.boardForm.get('title')?.value).toBeNull();
  });
  it('should not emit if form is invalid', () => {
    spyOn(component.create, 'emit');

    component.boardForm.get('title')?.setValue('');
    fixture.detectChanges();

    component.onSubmit();

    expect(component.create.emit).not.toHaveBeenCalled();
  });
});
