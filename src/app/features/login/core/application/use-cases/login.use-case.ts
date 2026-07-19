import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { AuthService, type LoginRequest } from '../../domain/services/auth.service';

@Injectable()
export class LoginUseCase {
  private readonly authService = inject(AuthService);

  execute(request: LoginRequest): Observable<string> {
    return this.authService.login(request);
  }
}
