import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fadeSlideIn } from '../../../animations';

@Component({
  selector: 'app-cookies-consent',
  imports: [CommonModule],
  templateUrl: './cookies-consent.component.html',
  animations: [fadeSlideIn]
})
export class CookiesConsentComponent implements OnInit {
  accepted = false;

  ngOnInit(): void {
    const consent = localStorage.getItem('cookieConsent');
    this.accepted = consent === 'true';
  }

  acceptCookies(): void {
    document.cookie = 'analytics=true; path=/; max-age=31536000'; 
    document.cookie = 'preferences=true; path=/; max-age=31536000';
    localStorage.setItem('cookieConsent', 'true');
    this.accepted = true;
    location.reload();
  }
}
