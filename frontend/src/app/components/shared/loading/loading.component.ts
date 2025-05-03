import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input() message: string = 'Carregando...';
 
}
