import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';

export const guestGuard: CanActivateFn = () => {
  const authToken = inject(AuthTokenService);
  const router = inject(Router);

  const token = authToken.getToken();
  if (token && !authToken.isTokenExpired()) {
    return router.createUrlTree(['/requests']);
  }

  return true;
};
