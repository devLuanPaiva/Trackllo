import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, FontAwesomeModule],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  private readonly translate = inject(TranslateService);
  private readonly elementRef = inject(ElementRef);
  @Input() selectedLang = 'pt'
  dropdownOpen = false;
  icons = {
    faLanguage,
  };

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang).subscribe({
      next: () => {
        this.selectedLang = lang;
        localStorage.setItem('language', lang);
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
