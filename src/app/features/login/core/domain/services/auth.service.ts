import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export enum Role {
  Advisor = 1,
  Student = 2,
}

export interface RegisterRequest {
  userId: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

@Injectable()
export abstract class AuthService {
  abstract login(request: LoginRequest): Observable<string>;
  abstract register(request: RegisterRequest): Observable<boolean>;
}
