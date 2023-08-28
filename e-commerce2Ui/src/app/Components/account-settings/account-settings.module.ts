import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccountSettingsComponent } from './account-settings.component';
import { AccSideNavComponent } from './acc-side-nav/acc-side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    AccountSettingsComponent,
    AccInfoComponent,
    AccSideNavComponent,
    UserOrdersComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class AccountSettingsModule { }
