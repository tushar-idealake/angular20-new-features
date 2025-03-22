import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'reject-errors',
    loadComponent: () => import('./reject-errors/reject-errors.component'),
  },
  {
    path: 'default-errors',
    loadComponent: () => import('./reject-errors/default-errors.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default-errors',
  },
  {
    path: '**',
    redirectTo: 'default-errors',
  },
];

export const navLinks = [
  {
    link: 'toSignal Default Error Handling Example',
    path: ['default-errors'],
  },
  {
    link: 'toSignal Catch Uncaught Exception Example',
    path: ['reject-errors'],
  },
];
