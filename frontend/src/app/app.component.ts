import { Component } from '@angular/core';
import { LayoutComponent } from "./components/template/layout/layout.component";

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
