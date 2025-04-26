import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageComponent } from "./components/shared/language/language.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LanguageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }
}
