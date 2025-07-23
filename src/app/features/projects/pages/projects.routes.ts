import { Routes } from '@angular/router';
import { ProjectsPage } from './projects/projects.page';
import { authGuard } from '@core/guards/auth/auth.guard';
import { MyProjectsPage } from './my-projects/my-projects.page';
import { RegisterProjectPage } from './register-project/register-project.page';

export const projectRoutes: Routes = [
  { path: '', component: ProjectsPage, canActivate: [authGuard] },
  {
    path: 'meus-projetos',
    component: MyProjectsPage,
    canActivate: [authGuard],
  },
  {
    path: 'cadastrar',
    component: RegisterProjectPage,
    canActivate: [authGuard],
  },
];
