import { Injectable } from '@angular/core';

const TOKEN_KEY = 'edu-apoyos-token';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.removeItem(TOKEN_KEY);
  }
}
