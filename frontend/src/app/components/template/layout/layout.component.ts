import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-layout',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @Input() className: string | undefined;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);
  currentURL = signal(this.router.url)

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
  icon = {
    logout: faArrowRightFromBracket
  }

  onLogout() {
    this.authService.logout()
  }
}
