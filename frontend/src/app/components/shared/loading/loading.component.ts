import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fadeIn, spin } from '../../../animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loading.component.html',
  animations: [fadeIn, spin],
})
export class LoadingComponent {
  @Input() message: string = 'Carregando...';
  faSpinner = faSpinner;
}
