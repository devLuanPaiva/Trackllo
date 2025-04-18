import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fadeIn, fadeInUp } from '../../animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  animations: [fadeIn, fadeInUp],
})
export class LandingComponent {}
