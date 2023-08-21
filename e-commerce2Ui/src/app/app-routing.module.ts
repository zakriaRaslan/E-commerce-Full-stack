import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { OrderComponent } from './Components/order/order.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { AccountSettingsComponent } from './Components/account-settings/account-settings.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'product-details',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'order',component:OrderComponent,canActivate:[AuthGuard]},
  {path:'account',component:AccountSettingsComponent , canActivate:[AuthGuard]},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  { path: 'dashboard', loadChildren: () => import('./Components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
