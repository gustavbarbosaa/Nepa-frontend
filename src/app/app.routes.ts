import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'autenticacao',
    loadChildren: () =>
      import('./features/auth/pages/auth.routes').then(r => r.authRoutes),
  },
  {
    path: 'inicio',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./features/home/pages/home.routes').then(r => r.homeRoutes),
  },
  { path: '', redirectTo: 'autenticacao', pathMatch: 'full' },
];
