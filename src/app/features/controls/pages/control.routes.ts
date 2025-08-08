import { Routes } from '@angular/router';

export const controlRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./control/control.page').then(c => c.ControlPage),
  },
];
