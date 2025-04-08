import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { mockUsers } from '../mocks';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

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
      expect(JSON.parse(sessionStorage.getItem('user') ?? '')).toEqual(mockUsers[0]);
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
});
