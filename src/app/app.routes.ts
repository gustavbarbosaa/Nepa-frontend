import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('./features/home/pages/home.routes').then(r => r.homeRoutes),
  },
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
    path: 'projetos',
    loadChildren: () =>
      import('./features/projects/pages/projects.routes').then(
        r => r.projectRoutes
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
  {
    path: 'inscricoes',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/subscriptions/pages/subscriptions.route').then(
        r => r.subscritionsRoutes
      ),
  },
  { path: '', redirectTo: 'autenticacao', pathMatch: 'full' },
];
