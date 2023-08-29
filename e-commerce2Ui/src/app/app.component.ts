import { Component } from '@angular/core';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce2Ui';
  constructor(private loaderService:LoaderService){}
  ShowLoader$=this.loaderService.LoadingActin$
}
