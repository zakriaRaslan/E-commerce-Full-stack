import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/Custom Validators/confirm-password.validator';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterModel, User } from 'src/app/models/model';
import{faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  eyeIcon = faEyeSlash;
  passwordType:string='password'
  isText:boolean=false;
  registerForm!: FormGroup;
  invalidConfirmPassword: boolean = false;
  registerMessage: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router,private loaderService:LoaderService) {}
  ngOnInit(): void {
    window.scroll(0,0);
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[a-zA-Z].*'),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[a-zA-Z].*'),
          ],
        ],
        userName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern("^01[0125][0-9]{8}$")
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: ConfirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  register() {
    this.loaderService.ShowLoader();
    let user: RegisterModel = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      userName: this.UserName.value,
      email: this.Email.value,
      address: this.Address.value,
      mobile: this.Mobile.value,
      password: this.Password.value,
    };
    this.authService.Register(user).subscribe({
      next: (res: any) => {
        this.registerForm.reset();
        this.registerMessage = res.message;
        this.authService.saveToken(res.token);
        this.authService.saveRefreshToken(res.refreshToken);
        this.router.navigate(['/home']);

      },
      error: (err) => {
        this.registerMessage = err.error;
      },
      complete:()=>{
        this.loaderService.HideLoader();
      }
    });
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
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get UserName(): FormControl {
    return this.registerForm.get('userName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  //  #End
}
