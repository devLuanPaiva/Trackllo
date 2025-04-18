import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  animations: [
    trigger('fadeSlide', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter', [
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class AlertComponent implements OnInit {
  @Input() message = 'Alerta!';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration = 5000;
  show = true;
  ngOnInit() {
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    this.show = false;
  }

  get alertStyle() {
    switch (this.type) {
      case 'success':
        return 'bg-green-200 text-green-600';
      case 'error':
        return 'bg-red-200 text-red-600';
      case 'info':
      default:
        return 'bg-blue-200 text-blue-600';
    }
  }
}
