import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

export const authRoutes: Routes = [
  { path: 'entrar', component: LoginPage },
  { path: 'cadastrar', component: RegisterPage },
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },
];
