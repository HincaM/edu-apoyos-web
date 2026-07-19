import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { AuthService, type LoginRequest, type RegisterRequest } from '../../domain/services/auth.service';

@Injectable()
export class AuthImplService implements AuthService {
  private readonly http = inject(HttpClient);

  login(request: LoginRequest): Observable<string> {
    return this.http.post('auth/login', request, { responseType: 'text' });
  }

  register(request: RegisterRequest): Observable<boolean> {
    return this.http.post<boolean>('auth/register', request);
  }
}
