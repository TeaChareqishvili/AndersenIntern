import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ErrorComponent } from './pages/error/error';

export enum AUTH_ROUTES {
  HOME = '',
  LOGIN = 'sign-in',
  REGISTER = 'sign-up',
  USER = 'user',
}

export const routes: Routes = [
  { path: AUTH_ROUTES.HOME, redirectTo: AUTH_ROUTES.LOGIN, pathMatch: 'full' },
  {
    path: AUTH_ROUTES.LOGIN,
    component: LoginComponent,
  },
  {
    path: AUTH_ROUTES.REGISTER,
    component: RegisterComponent,
  },
  {
    path: AUTH_ROUTES.USER,
    loadComponent: () => import('./pages/user/user').then((m) => m.UserComponent),
  },
  { path: '**', component: ErrorComponent },
];
