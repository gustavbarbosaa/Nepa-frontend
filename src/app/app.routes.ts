import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/pages/auth.routes').then(r => r.authRoutes),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/pages/home.routes').then(r => r.homeRoutes),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
