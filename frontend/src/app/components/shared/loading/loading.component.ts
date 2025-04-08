import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loading.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('spin', [
      transition('* => *', [
        animate(
          '2s linear infinite',
          keyframes([
            style({ transform: 'rotate(0deg)' }),
            style({ transform: 'rotate(360deg)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoadingComponent {
  @Input() message: string = 'Carregando...';
  faSpinner = faSpinner;
}
