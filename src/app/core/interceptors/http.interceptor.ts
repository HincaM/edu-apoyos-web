import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@environments/environment";
import { AuthTokenService } from "../services/auth-token.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }

  const isAuthRequest = /^\/?auth\//i.test(req.url);
  const url = `${environment.apiUrl}/${req.url.replace(/^\//, '')}`;

  if (isAuthRequest) {
    return next(req.clone({ url }));
  }

  const token = inject(AuthTokenService).getToken();
  if (!token) {
    return next(req.clone({ url }));
  }

  return next(
    req.clone({ url, setHeaders: { Authorization: `Bearer ${token}` } }),
  );
}