import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'autenticacao',
    loadChildren: () =>
      import('./features/auth/pages/auth.routes').then(r => r.authRoutes),
  },
  {
    path: 'alunos',
    loadChildren: () =>
      import('./features/students/pages/students.routes').then(
        r => r.studentsRoutes
      ),
  },
  {
    path: 'professores',
    loadChildren: () =>
      import('./features/teachers/pages/teacher.routes').then(
        r => r.teacherRoutes
      ),
  },
  {
    path: 'inicio',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/home/pages/home.routes').then(r => r.homeRoutes),
  },
  {
    path: 'editais',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/notices/pages/notices.routes').then(
        r => r.noticeRoutes
      ),
  },
  { path: '', redirectTo: 'autenticacao', pathMatch: 'full' },
];
