import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Server
  },
  {
    path: 'register',
    renderMode: RenderMode.Server
  },
  {
    path: 'requests',
    renderMode: RenderMode.Server
  },
  {
    path: 'requests/create',
    renderMode: RenderMode.Server
  },
  {
    path: 'requests/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'students',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
