import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should display the default message', () =>{
    fixture.detectChanges();
    const messageEl = fixture.nativeElement.querySelector('span');
    expect(messageEl.textContent).toContain('Alerta!');
  })
});
