import { Routes } from '@angular/router';

import { LoginPage } from './features/auth/pages/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { TodosPage } from './features/todos/pages/todos-page/todos-page';
import { NotFoundPage } from './features/not-found/pages/not-found-page/not-found-page';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'todos',
    component: TodosPage,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];