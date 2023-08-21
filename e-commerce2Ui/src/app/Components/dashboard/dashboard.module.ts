import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/Interceptors/Interceptors';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { OpenProductsBySubcategoryDirective } from './DashboardDirectives/open-products-by-subcategory.directive';
import { UsersListComponent } from './users-list/users-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    AddProductComponent,
    EditProductsComponent,
    OpenProductsBySubcategoryDirective,
    UsersListComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    CurrencyPipe,
    {provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
     multi:true
}
  ]
})
export class DashboardModule { }
