import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email],],
      password: ['', [Validators.required],],
    });
  }

  // #GetterRegion
  get Email():FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password() :FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
