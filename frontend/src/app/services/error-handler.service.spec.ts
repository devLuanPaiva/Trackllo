import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';
describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });
  it('should return message from errors[0].message', (done) => {
    const error = {
      error: {
        error: {
          errors: [{ message: 'Erro específico em errors[0]' }],
        },
      },
    };

    service.handle(error).subscribe({
      error: (err) => {
        expect(err.message).toBe('Erro específico em errors[0]');
        done();
      },
    });
  });
  it('should return fallbackMessage if no message found', (done) => {
    const error = {
      error: {},
    };

    service.handle(error, 'Mensagem alternativa').subscribe({
      error: (err) => {
        expect(err.message).toBe('Mensagem alternativa');
        done();
      },
    });
  });
});
