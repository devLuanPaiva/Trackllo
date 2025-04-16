import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthenticationService) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/autenticacao']);
      return false;
    }
  }
}
