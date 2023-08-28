import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEyeSlash ,faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/auth.service';
import { ModifyUserDto, User, UserInfo } from 'src/app/models/model';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css']
})
export class AccInfoComponent implements OnInit {
userInfoForm!:FormGroup
userInfo!:UserInfo;
formMessage:string='';
formMessageClass:string='';
eyeIcon = faEyeSlash;
passwordType:string='password'
isText:boolean=false;
constructor(private fb:FormBuilder , private authService:AuthService){}

ngOnInit() {
this.userInfo = this.authService.GetUser();
this.userInfoForm = this.fb.group({
  firstName:[this.userInfo.firstName,[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z].*')]],
  lastName:[this.userInfo.lastName,[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z].*')]],
  userName:[{value:this.userInfo.userName,disabled:true}],
  email:[{value:this.userInfo.email,disabled:true}],
  address:[this.userInfo.address,[Validators.required,Validators.maxLength(150),Validators.minLength(3)]],
  mobile:[this.userInfo.mobile,[Validators.required,Validators.pattern("^01[0125][0-9]{8}$")]],
  password:['',[Validators.required]]
})
}

SaveUserChanges(){
if(this.FirstName.value === this.userInfo.firstName && this.LastName.value === this.userInfo.lastName && this.Address.value===this.userInfo.address && this.Mobile.value===this.userInfo.mobile){
  this.formMessageClass='text-warning';
  this.formMessage = 'There Is No Any Changes'
  return;
}
let model:ModifyUserDto={
  firstName:this.FirstName.value,
  lastName:this.LastName.value,
  userName:this.UserName.value,
  email:this.Email.value,
  address:this.Address.value,
  mobile:this.Mobile.value,
  password:this.Password.value
}
this.authService.ModifyUser(model).subscribe({
  next:(res:any)=>{
    this.authService.saveToken(res.token);
    this.authService.saveRefreshToken(res.refreshToken)
    this.formMessageClass ='text-success';
    this.formMessage=res.message;
    this.Password.reset();
  },
  error:(err)=>{
    this.formMessageClass='text-danger';
    this.formMessage=err.error;
  }
})
}

togglePassword() {
  this.isText = !this.isText;
  if (this.isText) {
    this.passwordType = 'text';
    this.eyeIcon = faEye;
  } else {
    this.passwordType = 'password';
    this.eyeIcon = faEyeSlash;
  }
}

 // #GettersRegion
 get FirstName(): FormControl {
  return this.userInfoForm.get('firstName') as FormControl;
}
get LastName(): FormControl {
  return this.userInfoForm.get('lastName') as FormControl;
}
get UserName(): FormControl {
  return this.userInfoForm.get('userName') as FormControl;
}
get Email(): FormControl {
  return this.userInfoForm.get('email') as FormControl;
}
get Address(): FormControl {
  return this.userInfoForm.get('address') as FormControl;
}
get Mobile(): FormControl {
  return this.userInfoForm.get('mobile') as FormControl;
}
get Password():FormControl{
  return this.userInfoForm.get('password') as FormControl;
}
// End
}
