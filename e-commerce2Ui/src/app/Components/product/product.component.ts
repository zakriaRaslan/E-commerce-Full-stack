import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product, SalesProduct } from 'src/app/models/model';

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
 @Input() CartProduct:SalesProduct={
   title: '',
   description: '',
   price: 0,
   imageName: '',
   category: '',
   subCategory: '',
   discount: 0,
   originalProductId: 0,
   quantity:0,
   cartItemsId:0
 }
 cartId:number=0
constructor(public utilityService:UtilityService,public authService:AuthService,public cartService:CartService,private router:Router,private loaderService:LoaderService){}


RemoveFromCart(cartItemsId:number)
{
  this.loaderService.ShowLoader();
this.cartService.getActiveCart(this.authService.GetUser().userId).subscribe({
  next:(res)=>{
  this.cartId=res.id;
  this.cartService.RemoveFromCart(this.cartId,cartItemsId).subscribe((res:any)=>{
   window.location.reload();
  })
},complete:()=>{
  this.loaderService.HideLoader();
}
})


}

}
