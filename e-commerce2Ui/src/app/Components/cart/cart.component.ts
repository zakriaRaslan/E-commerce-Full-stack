import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Cart, Payment } from 'src/app/models/model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit , AfterViewInit {
  itemsMessage:boolean=false
  cart: Cart = {
    id: 0,
    User: this.authService.GetUser(),
    IsOrdered: false,
    createdDate: new Date(),
    cartItems: [],
  };
  previousUserCarts: Cart[] = [];
  userPaymentInfo: Payment = {
    id: 0,
    user: this.authService.GetUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      isAvailable: false,
      reason: '',
    },
    totalAmount: 0,
    shippingCharges: 0,
    amountReduce: 0,
    amountPaid: 0,
    createdAt: '',
  };
  totalProductAmount: number = 0;
  subscription!: Subscription;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    public utilityService: UtilityService,
    private loaderService:LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.ShowLoader();
    let userId = this.authService.GetUser().userId;
     // Get user Previous Carts
   this.cartService
    .getPreviousUserCarts(userId)
    .subscribe({
      next:(res)=>{
    this.previousUserCarts = res;
     console.log(this.previousUserCarts);
     return this.previousUserCarts;
    },complete:()=>{
      this.loaderService.HideLoader()
    }
    }
    );
    // get User Cart
this.loaderService.ShowLoader();
 this.cartService
      .getActiveCart(userId)
      .subscribe({
        next:(res)=>{
        this.cart = res;
        if (this.cart.cartItems.length == 0) {
          this.itemsMessage=true;
          return;
        }
        for (let cartItem of this.cart.cartItems) {
          this.totalProductAmount += cartItem.quantity;
        }
        this.cartService.CalculatePayment(this.cart, this.userPaymentInfo);
      },complete:()=>{
        this.loaderService.HideLoader();
      }
      });
  }
ngAfterViewInit(): void {

}

}
