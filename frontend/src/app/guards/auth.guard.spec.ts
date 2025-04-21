import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

import { AuthGuard } from './auth.guard';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let location: Location;
  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
      'isAuthenticated',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access when user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate();
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
  it('should deny access and navigate to /autenticacao when user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/autenticacao']);
  });
});
