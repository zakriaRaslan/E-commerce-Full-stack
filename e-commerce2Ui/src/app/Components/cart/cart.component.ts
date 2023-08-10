import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Cart, Payment } from 'src/app/models/model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart:Cart={
  id: 0,
  User: this.authService.GetUser(),
  IsOrdered: false,
  createdDate:new Date(),
  cartItems: []
}
previousUserCarts :Cart[]=[];
userPaymentInfo:Payment={
  id:0,
  user:this.authService.GetUser(),
  paymentMethod:{
    id:0,
    type:'',
    provider:'',
    isAvailable:false,
    reason:''
  },
  totalAmount:0,
  shippingCharges:0,
  amountReduce:0,
  amountPaid:0,
  createdAt:''
}

  constructor(private cartService:CartService ,private authService :AuthService,public utilityService:UtilityService){}

  ngOnInit(): void {
    let userId = this.authService.GetUser().userId
    // get User Cart
      this.cartService.getActiveCart(userId).subscribe((res)=>{
        this.cart=res;
        this.cartService.CalculatePayment(this.cart,this.userPaymentInfo);
      })
      // Get user Previous Carts
this.cartService.getPreviousUserCarts(userId).subscribe((res)=>{
  this.previousUserCarts=res;
  console.log(this.previousUserCarts);
})

  }


}
