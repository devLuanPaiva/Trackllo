import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardFormComponent } from './board-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('BoardForm component', () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, BoardFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should have a form with title control', () => {
    expect(component.boardForm.contains('title')).toBeTrue();
  });
});
