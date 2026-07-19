import { Routes } from '@angular/router';
import { LOGIN_PROVIDERS } from '@features/login/login.providers';
import { REQUESTS_SUPPORTS_PROVIDERS } from '@features/requests-supports/request-supports.providers';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    providers: [...LOGIN_PROVIDERS],
    loadComponent: () =>
      import('./features/login/pages/login.page/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    providers: [...LOGIN_PROVIDERS],
    loadComponent: () =>
      import('./features/login/pages/register.page/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'requests',
    providers: [...REQUESTS_SUPPORTS_PROVIDERS],
    loadComponent: () =>
      import('./features/requests-supports/pages/requests.page/requests.page').then(
        (m) => m.RequestsPage,
      ),
  },
];
