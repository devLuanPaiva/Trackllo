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

  it('should display the default message', () => {
    fixture.detectChanges();
    const messageEl = fixture.nativeElement.querySelector('span');
    expect(messageEl.textContent).toContain('Alerta!');
  });
  it('should display the custom message', () => {
    const customMessage = 'Custom alert message';
    component.message = customMessage;
    fixture.detectChanges();
    const messageEl = fixture.nativeElement.querySelector('span');
    expect(messageEl.textContent).toContain(customMessage);
  });
  it('should apply success style', () => {
    component.type = 'success';
    fixture.detectChanges();
    const divEl = fixture.debugElement.query(By.css('div'));
    expect(divEl.nativeElement.className).toContain('bg-green-200');
  });
  it('should hidden the alert after the duration', fakeAsync(() => {
    component.duration = 1000;
    fixture.detectChanges();
    expect(component.show).toBeTrue();

    tick(1000);
    fixture.detectChanges();

    expect(component.show).toBeFalse();
  }));
  it('should close the alert when the close button is clicked', () => {
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('button'));
    closeButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.show).toBeFalse();
  });
});
