import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../DashboardModels/dashboardModels';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
users:UserInfo[]=[];
constructor(private authService:AuthService){}
ngOnInit(){
    this.authService.GetUsersList().subscribe((res)=>{
      this.users = res;
    })
}
}
