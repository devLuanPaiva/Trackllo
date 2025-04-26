import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FontAwesomeModule,
  ],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  private readonly translate = inject(TranslateService);
  selectedLang = this.translate.currentLang || 'pt';
  dropdownOpen = false;
  icons = {
    faLanguage,
  };

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 100); 
  }

  switchLanguage(lang: string) {
    this.translate.use(lang).subscribe({
      next: () => {
        this.selectedLang = lang;
        this.dropdownOpen = false;
      },
      error: (err) => {
        console.error('Failed to change language', err);
        this.translate.use('pt');
        this.selectedLang = 'pt';
      },
    });
  }
}
