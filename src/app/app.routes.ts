import { Routes } from '@angular/router';
import { MainLayout } from '../components/MainLayout';
import { Login } from '../components/login';
import { Homepage } from '../components/homepage';
import { Product } from '../components/product';
import { Loading } from '../components/loading';
import { AddProduct } from '../components/add-product';
export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'product/:id', component: Product },
  {path: 'add-product' , component: AddProduct}
];
