import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageComponent } from "./components/shared/language/language.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LanguageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
