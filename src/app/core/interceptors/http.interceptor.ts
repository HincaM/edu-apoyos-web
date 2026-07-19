import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "@environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }

  return next(req.clone({ url: `${environment.apiUrl}/${req.url.replace(/^\//, '')}` }));
}