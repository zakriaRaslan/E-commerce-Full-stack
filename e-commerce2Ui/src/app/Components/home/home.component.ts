import { Component } from '@angular/core';
import { SuggestedProduct } from 'src/app/models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
suggestedProducts:SuggestedProduct[]=[
  {
    bannerImage:'Banner/Banner_Mobile.png',
    category:{
      categoryId:1,
      category:'Electronics',
      subcategory:'Mobiles'
    }
  },
  {
    bannerImage:'Banner/Banner_Laptop.png',
    category:{
      categoryId:1,
      category:'Electronics',
      subcategory:'Laptops'
    }
  },
  {
    bannerImage:'Banner/Banner_Chair.png',
    category:{
      categoryId:1,
      category:'Furniture',
      subcategory:'Chairs'
    }
  },
  {
    bannerImage:'Banner/Banner_Table.png',
    category:{
      categoryId:1,
      category:'Furniture',
      subcategory:'Tables'
    }
  },
]

constructor(){}
}
