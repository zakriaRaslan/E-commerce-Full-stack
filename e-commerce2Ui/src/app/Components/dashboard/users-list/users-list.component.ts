import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserInfo } from '../DashboardModels/dashboardModels';
import { AuthService } from 'src/app/Services/auth.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { DashboardService } from '../Services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
users:UserInfo[]=[];
subscription!:Subscription
constructor(private authService:AuthService,private loaderService:LoaderService,private dashboardService:DashboardService){}
ngOnInit(){
  this.loaderService.ShowLoader()
  window.scroll(0,0);
 this.GetUsers();
}

ngAfterViewInit(): void {
    this.loaderService.HideLoader();
}
GetUsers(){
  this.authService.GetUsersList().subscribe((res)=>{
    this.users = res;
  })
}
DeleteUser(userId:string){
if(confirm('Are You Sure To Delete This User?')){
this.subscription = this.dashboardService.DeleteUser(userId).subscribe();
alert('User Deleted Successfully');
this.GetUsers();
}
}
}
