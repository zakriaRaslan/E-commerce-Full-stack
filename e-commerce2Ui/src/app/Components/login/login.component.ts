import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginModel } from 'src/app/models/model';
import{faEye,faEyeSlash, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  eyeIcon = faEyeSlash;
  userIcon = faUser;
  lockIcon = faLock;
  passwordType:string='password'
  isText:boolean=false;
  loginForm!: FormGroup;
  loginMessage:string='';
  errorMessage:boolean=false;
  public resetPasswordEmail!: string;
  public isEmailValid!: boolean;

  constructor(private fb: FormBuilder,private authService:AuthService ,private router:Router,private cartService:CartService,private loaderService:LoaderService) {}
  ngOnInit(): void {
    window.scroll(0,0);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email],],
      password: ['', [Validators.required],],
    });
  }

  login(){
    this.loaderService.ShowLoader();
    let user:LoginModel={
      email:this.Email.value,
      password:this.Password.value
    }
    this.authService.login(user).subscribe({
      next:(res:any)=>{
       this.authService.saveToken(res.token)
       this.authService.saveRefreshToken(res.refreshToken);
        this.loginMessage=res.message
        this.loginForm.reset();
        this.errorMessage=false;
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        this.errorMessage=true;
        this.loginMessage=err.error;
      },
      complete:()=>{
        this.loaderService.HideLoader();
      }
    })
    this.cartService.getActiveCart(this.authService.GetUser().userId)
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


  CheckValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isEmailValid = pattern.test(value);
    return this.isEmailValid;
  }

  ConfirmEmail(){
if(this.CheckValidEmail(this.resetPasswordEmail)){
  console.log(this.resetPasswordEmail);
  this.authService.SendResetPasswordLink(this.resetPasswordEmail).subscribe({
    next:(res)=>{
      this.resetPasswordEmail='';
      const closeButton = document.getElementById('closeBtn');
      closeButton?.click();
      this.loginMessage = res.message
    },error:(err)=>{
      this.errorMessage=true;
      this.loginMessage=err.error;
    }
  })
}
  }

  // #GetterRegion
  get Email():FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password() :FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
