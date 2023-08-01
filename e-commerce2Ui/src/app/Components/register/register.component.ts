import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invalidConfirmPassword:boolean=false;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

register(){

}

  // #GettersRegion
  get FirstName():FormControl {
      return this.registerForm.get('firstName') as FormControl ;
    }
  get LastName():FormControl {
      return this.registerForm.get('lastName') as FormControl ;
    }
  get Email():FormControl {
      return this.registerForm.get('email') as FormControl ;
    }
  get Password():FormControl {
      return this.registerForm.get('password') as FormControl ;
    }
  get ConfirmPassword():FormControl {
      return this.registerForm.get('confirmPassword') as FormControl ;
    }
//  #End

}
