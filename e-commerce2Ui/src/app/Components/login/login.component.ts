import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginModel } from 'src/app/models/model';
import{faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  eyeIcon = faEyeSlash;
  passwordType:string='password'
  isText:boolean=false;
  loginForm!: FormGroup;
  loginMessage:string='';
  errorMessage:boolean=false;
  constructor(private fb: FormBuilder,private authService:AuthService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email],],
      password: ['', [Validators.required],],
    });
  }

  login(){
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
      },
      error:(err)=>{
        this.errorMessage=true;
        this.loginMessage=err.error;

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


  // #GetterRegion
  get Email():FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password() :FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
