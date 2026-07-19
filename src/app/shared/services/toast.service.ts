import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DURATION_MS = 4000;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.show(message, 'edu-toast-success');
  }

  error(message: string): void {
    this.show(message, 'edu-toast-error');
  }

  private show(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: DURATION_MS,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass,
    });
  }
}
