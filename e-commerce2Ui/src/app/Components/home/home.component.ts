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
    bannerImage:'Banner/Banner_Chair.png',
    category:{
      id:1,
      category:'Furniture',
      subcategory:'Chairs'
    }
  },
  {
    bannerImage:'Banner/Banner_Table.png',
    category:{
      id:1,
      category:'Furniture',
      subcategory:'Tables'
    }
  },
  {
    bannerImage:'Banner/Banner_Mobile.png',
    category:{
      id:1,
      category:'Electronics',
      subcategory:'Mobiles'
    }
  },
  {
    bannerImage:'Banner/Banner_Laptop.png',
    category:{
      id:1,
      category:'Electronics',
      subcategory:'Laptops'
    }
  },
]

constructor(){}
}
