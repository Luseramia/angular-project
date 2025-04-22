import { Routes } from '@angular/router';
import { MainLayout } from '../components/MainLayout';
import { Login } from '../components/login';
import { Homepage } from '../components/homepage';
import { Product } from '../components/product';
import { Loading } from '../components/loading';
import { AddProduct } from '../components/add-product';
import { Profile } from '../components/profile';
import { ManageProduct } from '../components/manage-product';
import {  AddTypeProduct} from '../components/admin-add-type-product';
import { AuthGuard } from '../router-gaurd';
export const routes: Routes = [
  { path: '', component: Homepage },
  {
    path: 'product/:id',
    component: Product,
    runGuardsAndResolvers: 'paramsChange',
    canActivate: [AuthGuard] 
  },
  { path: 'add-product', component: AddProduct,canActivate: [AuthGuard] },
  { path: 'profile', component: Profile,canActivate: [AuthGuard] },
  { path: 'getProductByUserId', component: ManageProduct,canActivate: [AuthGuard] },
  { path: 'addProductType', component: AddTypeProduct, }, 
];
