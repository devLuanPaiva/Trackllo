import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { LanguageComponent } from './components/shared/language/language.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './services/authentication.service';
import { filter } from 'rxjs';
import { rotateGear } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LanguageComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  animations: [rotateGear],
})
export class AppComponent {
  icons = {
    faGear,
    faArrowRightFromBracket,
  };
  dropdownOpen = false;

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

  showLayout = computed(() => {
    const url = this.currentURL();
    return url !== '/' && url !== '/autenticacao';
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
