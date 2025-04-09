import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { mockUsers } from '../mocks';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  const apiURL = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login a user and store token/user in sessionStorage', () => {
    const token = 'token-alice-123';

    service.login('alice@example.com', 'user-1').subscribe((user) => {
      expect(user).toEqual(mockUsers[0]);
      expect(sessionStorage.getItem('token')).toBe(token);
      expect(JSON.parse(sessionStorage.getItem('user') ?? '')).toEqual(
        mockUsers[0]
      );
    });

    const req = httpMock.expectOne(`${apiURL}/users/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      data: {
        user: mockUsers[0],
        token: token,
      },
    });
  });
  it('should throw error on login failure', () => {
    const email = 'wrong@example.com';
    const password = 'wrong';

    service.login(email, password).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error.message).toBe('Invalid credentials');
      },
    });

    const req = httpMock.expectOne(`${apiURL}/users/login`);
    req.flush(
      { message: 'Invalid credentials' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
  it('should register a user and call login internally', () => {
    spyOn(service, 'login').and.returnValue(of(mockUsers[0]));
    const name = 'John';
    const email = 'john@example.com';
    const password = '123456';

    service.register(name, email, password).subscribe((user) => {
      expect(service.login).toHaveBeenCalledWith(email, password);
    });

    const req = httpMock.expectOne(`${apiURL}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUsers[0]);
  });
  it('should throw error on register failure', () => {
    service.register('John', 'email', 'pass').subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.message).toBe('Email already in use');
      },
    });

    const req = httpMock.expectOne(`${apiURL}/users`);
    req.flush({ message: 'Email already in use' }, { status: 400, statusText: 'Bad Request' });
  });
  it('should get token from sessionStorage', () => {
    sessionStorage.setItem('token', 'token-alice-123');
    expect(service.getToken()).toBe('token-alice-123');
  });
  it('should get logged user from sessionStorage', () => {
    sessionStorage.setItem('user', JSON.stringify(mockUsers[0]));
    expect(service.getLoggedUser()).toEqual(mockUsers[0]);
  });

  it('should remove user and token from sessionStorage on logout', () => {
    sessionStorage.setItem('token', 'token-alice-123');
    sessionStorage.setItem('user', JSON.stringify(mockUsers[0]));

    service.logout().subscribe(() => {
      expect(sessionStorage.getItem('token')).toBeNull();
      expect(sessionStorage.getItem('user')).toBeNull();
    });
  });
});
