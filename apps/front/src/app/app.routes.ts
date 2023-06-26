import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'time-logger',
    loadComponent: () =>
      import('./time-logger/time-logger.component').then(
        c => c.TimeLoggerComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'time-logger',
  },
];
