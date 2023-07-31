import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from 'src/app/models/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
navigationList:NavigationItem[]=[
  {
    category:'Electronics',
    subCategory:['Mobiles',"Laptops"],
  },
  {
    category:"Furniture",
    subCategory:["Chairs","Tables"]
  }
];
constructor(private router:Router){}

Home(){
this.router.navigate(['/home']);
}
}
