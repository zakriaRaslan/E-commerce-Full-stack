import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmPasswordValidator } from 'src/app/Custom Validators/confirm-password.validator';
import { AuthService } from 'src/app/Services/auth.service';
import { ResetPasswordDto } from 'src/app/models/model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordDto: ResetPasswordDto = new ResetPasswordDto();
  isText: boolean = false;
  passwordType: string = 'password';
  eyeIcon = faEyeSlash;
  formMessage:string='';
  formMessageClass:string='';

  constructor( private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router){}

  ngOnInit(){
    this.resetPasswordForm = this.fb.group({
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}')]],
      confirmPassword:['',[Validators.required]]
    },{validators: ConfirmPasswordValidator('password', 'confirmPassword')});

    this.activateRoute.queryParams.subscribe((val)=>{
      this.emailToReset = val['email'];
      let urlCode = val['code'];
      this.emailToken=urlCode.replace(/ /g,'+');
    });
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordDto.Email = this.emailToReset;
      this.resetPasswordDto.EmailToken = this.emailToken;
      this.resetPasswordDto.Password = this.Password.value;
      this.resetPasswordDto.ConfirmPassword = this.ConfirmPassword.value;

      this.authService.ResetPassword(this.resetPasswordDto).subscribe({
        next:(res)=>{
          this.formMessageClass='text-success';
          this.formMessage=res.message;
          this.resetPasswordForm.reset();
        },error:(err)=>{
          this.formMessageClass='text-danger';
          this.formMessage=err.error;
        }
      })
    }
  }

  togglePassword(){
    this.isText = !this.isText;
    if (this.isText) {
      this.passwordType = 'text';
      this.eyeIcon = faEye;
    } else {
      this.passwordType = 'password';
      this.eyeIcon = faEyeSlash;
    }
  }

  // Getter
  get Password():FormControl{
    return this.resetPasswordForm.get('password') as FormControl
  }
  get ConfirmPassword():FormControl{
    return this.resetPasswordForm.get('confirmPassword') as FormControl
  }
}
