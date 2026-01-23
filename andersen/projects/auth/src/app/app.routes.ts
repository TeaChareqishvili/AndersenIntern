import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ErrorComponent } from './pages/error/error';

export enum AppRoutes {
  HOME = '',
  LOGIN = 'sign-in',
  REGISTER = 'sign-up',
}

export const routes: Routes = [
  { path: AppRoutes.HOME, redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
  {
    path: AppRoutes.LOGIN,
    component: LoginComponent,
  },
  {
    path: AppRoutes.REGISTER,
    component: RegisterComponent,
  },
  { path: '**', component: ErrorComponent },
];
