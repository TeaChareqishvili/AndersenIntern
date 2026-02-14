import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      return;
    }

    const httpError = (error as any)?.rejection;
    if (httpError instanceof HttpErrorResponse) {
      return;
    }
  }
}
