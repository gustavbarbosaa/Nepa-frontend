import { Routes } from '@angular/router';
import { ProjectsPage } from './projects/projects.page';
import { authGuard } from '@core/guards/auth/auth.guard';

export const projectRoutes: Routes = [
  { path: '', component: ProjectsPage, canActivate: [authGuard] },
];
