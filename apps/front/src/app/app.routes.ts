import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'time-logger',
    loadChildren: () =>
      import('./time-logger/time-logger.module').then(m => m.TimeLoggerModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'time-logger',
  },
];
