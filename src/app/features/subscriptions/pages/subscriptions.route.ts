import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';

export const subscritionsRoutes: Routes = [
  {
    path: ':id',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        '../pages/subscriptions/subscriptions/subscriptions.component'
      ).then(c => c.SubscriptionsComponent),
  },
];
