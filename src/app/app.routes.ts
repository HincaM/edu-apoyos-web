import { Routes } from '@angular/router';
import { LOGIN_PROVIDERS } from '@features/login/login.providers';
import { Role } from '@features/login/core/domain/services/auth.service';
import { REQUESTS_SUPPORTS_PROVIDERS } from '@features/requests-supports/request-supports.providers';
import { STUDENTS_PROVIDERS } from '@features/students/students.providers';
import { ACADEMIC_PROGRAMS_PROVIDERS } from '@features/academic-programs/academic-programs.providers';
import { USERS_PROVIDERS } from '@features/users/users.providers';
import { authGuard } from '@core/guards/auth.guard';

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
    providers: [...LOGIN_PROVIDERS, ...ACADEMIC_PROGRAMS_PROVIDERS],
    loadComponent: () =>
      import('./features/login/pages/register.page/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'requests',
    canActivate: [authGuard],
    data: { roles: [Role.Advisor, Role.Student] },
    providers: [...REQUESTS_SUPPORTS_PROVIDERS],
    loadComponent: () =>
      import('./features/requests-supports/pages/requests.page/requests.page').then(
        (m) => m.RequestsPage,
      ),
  },
  {
    path: 'requests/create',
    canActivate: [authGuard],
    data: { roles: [Role.Advisor] },
    providers: [
      ...REQUESTS_SUPPORTS_PROVIDERS,
      ...ACADEMIC_PROGRAMS_PROVIDERS,
      ...USERS_PROVIDERS,
      ...STUDENTS_PROVIDERS,
    ],
    loadComponent: () =>
      import('./features/requests-supports/pages/request-create.page/request-create.page').then(
        (m) => m.RequestCreatePage,
      ),
  },
  {
    path: 'requests/:id',
    canActivate: [authGuard],
    data: { roles: [Role.Advisor, Role.Student] },
    providers: [...REQUESTS_SUPPORTS_PROVIDERS],
    loadComponent: () =>
      import('./features/requests-supports/pages/request-detail.page/request-detail.page').then(
        (m) => m.RequestDetailPage,
      ),
  },
  {
    path: 'students',
    canActivate: [authGuard],
    data: { roles: [Role.Advisor] },
    providers: [...STUDENTS_PROVIDERS],
    loadComponent: () =>
      import('./features/students/pages/students.page/students.page').then(
        (m) => m.StudentsPage,
      ),
  },
];
