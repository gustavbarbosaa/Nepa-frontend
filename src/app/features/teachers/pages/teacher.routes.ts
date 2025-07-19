import { Routes } from '@angular/router';
import { TeacherPage } from './teacher/teacher.page';
import { authGuard } from '@core/guards/auth/auth.guard';

export const teacherRoutes: Routes = [
  { path: '', component: TeacherPage, canActivate: [authGuard] },
];
