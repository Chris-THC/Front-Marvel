import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthenticatedGuard } from './core/guard/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
