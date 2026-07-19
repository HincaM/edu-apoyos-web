import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHelperService {
  extractErrorMessage(err: unknown, fallbackMessage: string): string {
    if (err instanceof HttpErrorResponse) {
      if (err.error?.errors) {
        const firstField = Object.values<string[]>(err.error.errors)[0];
        if (firstField?.length) {
          return firstField[0];
        }
      }
      if (typeof err.error === 'string' && err.error) {
        return err.error;
      }
      if (err.error?.detail) {
        return err.error.detail;
      }
      if (err.error?.title) {
        return err.error.title;
      }
    }
    return fallbackMessage;
  }
}
