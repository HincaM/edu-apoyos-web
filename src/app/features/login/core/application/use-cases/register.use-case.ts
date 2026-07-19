import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { AuthService, type RegisterRequest } from '../../domain/services/auth.service';

@Injectable()
export class RegisterUseCase {
  private readonly authService = inject(AuthService);

  execute(request: RegisterRequest): Observable<boolean> {
    return this.authService.register(request);
  }
}
