import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestedProduct } from 'src/app/models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
suggestedProducts:SuggestedProduct[]=[
  {
    bannerImage:'Banner/Banner_Mobile.png',
    category:{
      categoryId:1,
      category:'electronics',
      subcategory:'mobiles'
    }
  },
  {
    bannerImage:'Banner/Banner_Laptop.png',
    category:{
      categoryId:1,
      category:'electronics',
      subcategory:'laptops'
    }
  },
  {
    bannerImage:'Banner/Banner_Chair.png',
    category:{
      categoryId:1,
      category:'furniture',
      subcategory:'chairs'
    }
  },
  {
    bannerImage:'Banner/Banner_Table.png',
    category:{
      categoryId:1,
      category:'furniture',
      subcategory:'tables'
    }
  },
]

constructor(private router:Router){}
toProducts(category:string , subcategory:string){
this.router.navigateByUrl(`products?category=${category}&subcategory=${subcategory}`);
window.scroll(0,0);
}
}
