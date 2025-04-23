import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule, MatOption } from '@angular/material/select';
@Component({
  selector: 'app-language',
  imports: [MatFormFieldModule, MatSelectModule, MatLabel, MatOption],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  switchLanguage(lang: string) {
    window.location.href = `/${lang}/`
  }
}
