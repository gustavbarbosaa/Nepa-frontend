import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';

export const studentsRoutes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
];
