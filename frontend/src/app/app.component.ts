import { CommonModule } from '@angular/common';
import {Component,computed,ElementRef,HostListener,inject,signal} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LanguageComponent } from './components/shared/language/language.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './services/authentication.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LanguageComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  icons = {
    faGear,
    faArrowRightFromBracket,
  };
  dropdownOpen = false;

  private readonly authService = inject(AuthenticationService);
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  currentURL = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentURL.set(event.urlAfterRedirects)
      })
  }
  showLayout = computed(() => {
    const url = this.currentURL();
    return url !== '/' && url !== '/autenticacao';
  });
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
  onLogout() {
    this.authService.logout();
  }
}
