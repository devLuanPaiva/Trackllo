
import { filter } from 'rxjs';
import { isBrowser } from './utils';
import { rotateGear } from './animations';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { faArrowRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import { LanguageComponent } from './components/shared/language/language.component';
import { CookiesConsentComponent } from './components/shared/cookies-consent/cookies-consent.component';
import { Component, ElementRef, HostListener, ViewChild, inject, computed, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LanguageComponent, FontAwesomeModule, CookiesConsentComponent],
  templateUrl: './app.component.html',
  animations: [rotateGear],
})
export class AppComponent implements OnInit {
  icons = {
    faGear,
    faArrowRightFromBracket,
  };
  dropdownOpen = false;
  accepted = false;

  private readonly gaService = inject(GoogleAnalyticsService);
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);
  currentURL = signal(this.router.url);

  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentURL.set(event.urlAfterRedirects);
      });
  }
  ngOnInit(): void {
    if (isBrowser()) {
      if (localStorage.getItem('cookieConsent') === 'true') {
        this.gaService.load();
        this.accepted = true;
      }
    }
  }

  showLayout = computed(() => {
    const url = this.currentURL();
    return url !== '/' && url !== '/autenticacao' && url !== '/politicas';
  });

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.dropdownWrapper?.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
