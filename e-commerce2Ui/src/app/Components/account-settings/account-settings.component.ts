import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserInfo } from 'src/app/models/model';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{
userInfo:UserInfo={
  firstName:'',
  lastName:'',
  userName:'',
  email:'',
  address:'',
  mobile:''
}

  constructor(private accountService:AccountService , private authService:AuthService){}

ngOnInit(): void {
    this.accountService.getUserInfo(this.authService.GetUser().userId).subscribe((res)=>{
      this.userInfo = res;
    })
}
}
