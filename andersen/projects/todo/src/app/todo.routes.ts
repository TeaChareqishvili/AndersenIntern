import { Routes } from '@angular/router';
import { TodoPageComponent } from './todo-page/todo-page.component';

export enum TODO_ROUTES {
  HOME = '',
}

export const routes: Routes = [{ path: TODO_ROUTES.HOME, component: TodoPageComponent }];
