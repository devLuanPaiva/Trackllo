import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { fadeInScale } from '../../../animations';
@Component({
  selector: 'app-logo',
  imports: [FontAwesomeModule, MatTooltipModule, RouterLink],
  templateUrl: './logo.component.html',
  animations: [fadeInScale],
})
export class LogoComponent {
  faTasks = faTasks;
}
