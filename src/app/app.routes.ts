import { Routes } from '@angular/router';
import { MainLayout } from '../components/MainLayout';
import { Login } from '../components/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'test', component: MainLayout },
];
