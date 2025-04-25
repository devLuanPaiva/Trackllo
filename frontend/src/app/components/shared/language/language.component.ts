import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule, MatOption } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-language',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatLabel,
    MatOption,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  private readonly translate = inject(TranslateService);
  selectedLang = this.translate.currentLang || 'pt';

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.selectedLang = lang;
  }
}
