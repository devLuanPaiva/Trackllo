import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fadeIn, fadeInUp } from '../../animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './landing.component.html',
  animations: [fadeIn, fadeInUp],
})
export class LandingComponent {}
