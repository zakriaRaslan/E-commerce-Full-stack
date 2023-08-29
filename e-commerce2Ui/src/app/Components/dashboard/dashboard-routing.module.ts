import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [{ path: '', component: DashboardComponent,children:[
  {path:'add-product',component:AddProductComponent},
  {path:'products-list',component:ProductsListComponent},
  {path:'users-list',component:UsersListComponent},
  {path:'add-category',component:AddCategoryComponent},
  {path:'add-offer',component:AddOfferComponent},
  {path:'user-edit/:userId',component:UserEditComponent},
  {path:'edit-product/:productId',component:EditProductComponent},
  {path:'delete-user/:userId',component:EditProductComponent},

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
