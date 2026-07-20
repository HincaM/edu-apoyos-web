import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROLE_CLAIM_VALUES, Role } from '@features/login/core/domain/services/auth.service';
import { AuthTokenService } from '../services/auth-token.service';

export const authGuard: CanActivateFn = (route) => {
  const authToken = inject(AuthTokenService);
  const router = inject(Router);

  const token = authToken.getToken();
  if (!token || authToken.isTokenExpired()) {
    authToken.clearToken();
    return router.createUrlTree(['/login']);
  }

  const allowedRoles = route.data['roles'] as Role[] | undefined;
  if (allowedRoles?.length) {
    const roleClaim = authToken.getRole();
    const allowedClaims = allowedRoles.map((role) => ROLE_CLAIM_VALUES[role]);
    if (!roleClaim || !allowedClaims.includes(roleClaim)) {
      return router.createUrlTree(['/login']);
    }
  }

  return true;
};
