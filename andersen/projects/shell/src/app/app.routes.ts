import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../../../auth/src/app/auth.routes').then((m) => m.AUTH_ROUTES_CONFIG),
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('../../../todo/src/app/todo.routes').then((m) => m.TODO_ROUTES_CONFIGS),
  },
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
];
