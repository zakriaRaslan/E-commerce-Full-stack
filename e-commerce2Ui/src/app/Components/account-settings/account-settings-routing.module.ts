import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccountSettingsComponent } from './account-settings.component';
import { AccSideNavComponent } from './acc-side-nav/acc-side-nav.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [{path:'',component:AccountSettingsComponent,children:[
  {path:'nav-bar',component:AccSideNavComponent},
  {path:'acc-info',component:AccInfoComponent},
  {path:'user-orders',component:UserOrdersComponent},
  {path:'change-pass',component:ChangePasswordComponent},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
