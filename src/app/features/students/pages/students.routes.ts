import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';
import { StudentsPage } from './students/students.page';

export const studentsRoutes: Routes = [
  { path: '', component: StudentsPage, canActivate: [authGuard] },
];
