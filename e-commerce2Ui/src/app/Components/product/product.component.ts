import { Component,Input } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
@Input() view:'grid'|'list'|'currentCartItem'|'prevCartItem'='grid';
@Input() product:Product={
  productId:0,
    title:'',
    description:'',
    price:0,
    quantity:0,
    imageName:'',
    offer:{
      offerId:1,
      title:'',
      discount:0,
    },
    category:{
      categoryId:1,
      category:'',
      subcategory:''
    }
}
constructor(public utilityService:UtilityService,public authService:AuthService,public cartService:CartService){}
}
