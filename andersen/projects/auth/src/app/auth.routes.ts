import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ErrorComponent } from './pages/error/error';
import { App } from './app';
import { GLOBAL_NAV_TYPES } from '@shared';

export const routes: Routes = [
  {
    path: GLOBAL_NAV_TYPES.HOME,
    component: App,
    children: [
      {
        path: GLOBAL_NAV_TYPES.HOME,
        redirectTo: GLOBAL_NAV_TYPES.LOGIN,
        pathMatch: 'full',
      },
      {
        path: GLOBAL_NAV_TYPES.LOGIN,
        component: LoginComponent,
      },
      {
        path: GLOBAL_NAV_TYPES.REGISTER,
        component: RegisterComponent,
      },
      {
        path: GLOBAL_NAV_TYPES.USER,
        loadComponent: () => import('./pages/user/user').then((m) => m.UserComponent),
      },
      { path: '**', component: ErrorComponent },
    ],
  },
];
