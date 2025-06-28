import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
// import { authGuard } from '@core/guards/auth/auth.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomePage,
    // canActivate: [authGuard],
  },
];
