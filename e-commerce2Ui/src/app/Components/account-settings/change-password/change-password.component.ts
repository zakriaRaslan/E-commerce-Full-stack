import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { ConfirmPasswordValidator } from 'src/app/Custom Validators/confirm-password.validator';
import { AuthService } from 'src/app/Services/auth.service';
import { ChangePasswordDto} from 'src/app/models/model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  isText: boolean = false;
  passwordType: string = 'password';
  eyeIcon = faEyeSlash;
  formMessage:string='';
  formMessageClass:string='';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword:['',[Validators.required]],
        newPassword: new FormControl(null, [Validators.required,  Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        )]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: ConfirmPasswordValidator('newPassword', 'confirmPassword'),
      }
    );
  }

  ChangePassword() {
    var changePasswordModel:ChangePasswordDto = {
      email:this.authService.GetUser().email,
      oldPassword:this.OldPassword.value,
      newPassword:this.NewPassword.value,
    }
    this.authService.ChangePassword(changePasswordModel).subscribe({
      next:(res:any)=>{
        this.formMessageClass = 'text-success'
        this.formMessage =res.message;
        this.changePasswordForm.reset();
        this.authService.saveToken(res.token);
        this.authService.saveRefreshToken(res.refreshToken);
      },error:(err)=>{
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

  // GetterRegion
  get OldPassword():FormControl{
    return this.changePasswordForm.get('oldPassword') as FormControl;
  }
  get NewPassword():FormControl{
    return this.changePasswordForm.get('newPassword') as FormControl;
  }
  get ConfirmPassword():FormControl{
    return this.changePasswordForm.get('confirmPassword') as FormControl;
  }
}


