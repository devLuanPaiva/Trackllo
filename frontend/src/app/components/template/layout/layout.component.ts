import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-layout',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @Input() className: string | undefined;
}
