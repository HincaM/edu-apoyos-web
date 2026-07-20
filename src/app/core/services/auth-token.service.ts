import { Injectable } from '@angular/core';

const TOKEN_KEY = 'edu-apoyos-token';
const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const NAME_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

interface JwtPayload {
  [ROLE_CLAIM]?: string;
  [NAME_CLAIM]?: string;
  exp?: number;
  [key: string]: any;
}

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

  getRole(): string | null {
    const payload = this.decodePayload();
    return payload?.[ROLE_CLAIM] ?? null;
  }

  getNameId(): string | null {
    const payload = this.decodePayload();
    return payload?.[NAME_CLAIM] ?? null;
  }

  getStudentId(): string | null {
    const payload = this.decodePayload();
    return payload?.['Student'] ?? null;
  }

  isTokenExpired(): boolean {
    const payload = this.decodePayload();
    if (!payload?.exp) {
      return true;
    }
    return payload.exp * 1000 <= Date.now();
  }

  private decodePayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const segments = token.split('.');
    if (segments.length !== 3) {
      return null;
    }
    try {
      const base64 = segments[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = atob(base64);
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }
}
