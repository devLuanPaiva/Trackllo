import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-logo',
  imports: [FontAwesomeModule, MatTooltipModule, RouterLink],
  templateUrl: './logo.component.html',
  animations: [trigger('fadeInScale', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0,9)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
    ])
  ])]
})
export class LogoComponent {
  faTasks = faTasks;
}
