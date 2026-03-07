import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user';

export enum HISTORY_ROUTES {
  HOME = '',
}

export const routes: Routes = [
  {
    path: HISTORY_ROUTES.HOME,
    component: UserComponent,
  },
];
