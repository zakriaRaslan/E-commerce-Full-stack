import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart, Payment, Product } from '../models/model';
import { AuthService } from './auth.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
changeCart=new Subject();
BaseUrl:string="https://localhost:7197/api/Cart/"
  constructor(private http:HttpClient,private authServes:AuthService , private utilityService:UtilityService) { }

 AddToCart(product:Product){
 let productId = product.productId;
 let userId = this.authServes.GetUser().userId
this.InsertItemToCart(userId,productId).subscribe({
  next:(res)=>{
    this.changeCart.next(1);
  },
  error:(err)=>{
    console.log(err.error);
  }
} )
 }

 InsertItemToCart(userId:string,productId:number){
let url = `${this.BaseUrl}addtocart/${userId}/${productId}`
return this.http.post(url,null,{responseType:'text'});
 }

 getActiveCart(userId:string){
  let url = `${this.BaseUrl}getusercart/${userId}`
  return this.http.get<any>(url);
 }

 CalculatePayment(cart:Cart,payment:Payment){
  payment.totalAmount=0;
  payment.amountPaid=0;
  payment.amountReduce=0;
  for (let cartItem of cart.cartItems){
    payment.totalAmount += cartItem.product.price;
    payment.amountReduce += cartItem.product.price - this.utilityService.applyDiscount(cartItem.product.price,cartItem.product.offer.discount);
    payment.amountPaid += this.utilityService.applyDiscount(cartItem.product.price,cartItem.product.offer.discount);
  }
  if(payment.amountPaid>50000)payment.shippingCharges=2000;
  else if(payment.amountPaid>20000)payment.shippingCharges=1000;
  else if(payment.amountPaid>5000)payment.shippingCharges=500;
  else payment.shippingCharges=200;
 }

 getPreviousUserCarts(userId:string){
  let url = `${this.BaseUrl}get-previous-user-carts/${userId}`
  return this.http.get<any>(url);
 }
}
