import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserInfo } from '../DashboardModels/dashboardModels';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Subscription,take } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit{
  userForm!: FormGroup;
  user: UserInfo = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    address: '',
    mobile: '',
    roles: [],
  };
subscription!:Subscription;
  formMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  async ngOnInit() {
    const userId = this.activateRoute.snapshot.paramMap.get('userId');
    this.user = await this.authService.getUserById(userId).pipe(take(1)).toPromise();
    console.log(this.user);

    this.userForm = this.fb.group({
      firstName:[this.user.firstName,[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z].*')]],
      lastName:[this.user.lastName,[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z].*')]],
      userName:[{value:this.user.userName,disabled:true}],
      email:[{value:this.user.email,disabled:true}],
      address:[this.user.address,[Validators.required,Validators.maxLength(150),Validators.minLength(3)]],
      mobile:[this.user.mobile,[Validators.required,Validators.pattern("^01[0125][0-9]{8}$")]],
      roles: [this.user.roles],
    });
  }

  EditUser() {}

  // Getter
  get FirstName(): FormControl {
    return this.userForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.userForm.get('lastName') as FormControl;
  }
  get UserName(): FormControl {
    return this.userForm.get('userName') as FormControl;
  }
  get Email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }
  get Address(): FormControl {
    return this.userForm.get('address') as FormControl;
  }
  get Mobile(): FormControl {
    return this.userForm.get('mobile') as FormControl;
  }
  get Roles(): FormControl {
    return this.userForm.get('roles') as FormControl;
  }
}
