import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @Input() className: string | undefined;
  @Input() headerNone: boolean | undefined;
  @Input() footerNone: boolean | undefined;
}
