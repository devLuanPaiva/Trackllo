import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fadeIn } from '../../../animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './loading.component.html',
  animations: [fadeIn],
})
export class LoadingComponent {
  @Input() message: string = 'Carregando...';
  faSpinner = faSpinner;
  spinning = true
}
