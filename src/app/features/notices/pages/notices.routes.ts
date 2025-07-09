import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';
import { NoticesPage } from './notices/notices.page';

export const noticeRoutes: Routes = [
  {
    path: '',
    component: NoticesPage,
    canActivate: [authGuard],
  },
];
