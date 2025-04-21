import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}
  handle(error: any, fallbackMessage: string = 'Erro inesperado') {
    const message =
      error?.error?.error?.errors?.[0]?.message ??
      error?.error?.error?.message ??
      error?.error?.message ??
      fallbackMessage;
    return throwError(() => new Error(message));
  }
}
