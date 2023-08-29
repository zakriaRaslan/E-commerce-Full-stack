import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , AfterViewInit {
constructor(private loaderService:LoaderService){}



  ngOnInit(): void {
    this.loaderService.ShowLoader();
  }
  ngAfterViewInit(): void {
    this.loaderService.HideLoader();
  }

}
