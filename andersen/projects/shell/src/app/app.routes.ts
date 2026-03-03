import { Routes } from '@angular/router';

export enum SHELL_ROUTES {
  AUTH = 'auth',
  TODO = 'todo',
  HOME = '',
  ABSOLUTE = 'auth/sign-in',
}

export const routes: Routes = [
  {
    path: SHELL_ROUTES.AUTH,
    loadChildren: () => import('@auth/app/auth.routes').then((m) => m.routes),
  },
  {
    path: SHELL_ROUTES.TODO,
    loadChildren: () => import('@todo/app/todo.routes').then((m) => m.routes),
  },
  {
    path: SHELL_ROUTES.HOME,
    redirectTo: SHELL_ROUTES.ABSOLUTE,
    pathMatch: 'full',
  },
];
