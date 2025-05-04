import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fadeSlideIn } from '../../../animations';
import { isBrowser } from '../../../utils';

@Component({
  selector: 'app-cookies-consent',
  imports: [CommonModule],
  templateUrl: './cookies-consent.component.html',
  animations: [fadeSlideIn],
})
export class CookiesConsentComponent implements OnInit {
  accepted = false;

  ngOnInit(): void {
    if (isBrowser()) {
      const consent = localStorage.getItem('cookieConsent');
      this.accepted = consent === 'true';
    }
  }

  acceptCookies(): void {
    if (isBrowser()) {
      document.cookie = 'analytics=true; path=/; max-age=31536000';
      document.cookie = 'preferences=true; path=/; max-age=31536000';
      localStorage.setItem('cookieConsent', 'true');
      this.accepted = true;
      location.reload();
    }
  }
}
