import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [{ path: '', component: DashboardComponent,children:[
  {path:'add-product',component:AddProductComponent},
  {path:'edit-product',component:EditProductsComponent},
  {path:'users-list',component:UsersListComponent},
  {path:'add-category',component:AddCategoryComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
