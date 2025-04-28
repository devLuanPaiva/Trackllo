import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';

import { encodingInterceptor } from './encoding.interceptor';
import { of } from 'rxjs';

describe('encodingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => encodingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  it('should change the response by removing BOM and parsing JSON', (done) => {
    const mockReq = new HttpRequest('GET', 'assets/data.json');

    const mockNext = (req: HttpRequest<any>) => {
      expect(req.responseType).toBe('text');
      const bodyWithBOM = '\uFEFF{"key":"value"}';
      const response = new HttpResponse({ body: bodyWithBOM, status: 200 });
      return of(response);
    };

    interceptor(mockReq, mockNext).subscribe((event) => {
      expect(event instanceof HttpResponse).toBeTrue();
      const response = event as HttpResponse<any>;
      expect(response.body).toEqual({ key: 'value' });
      done();
    });
  });

});
