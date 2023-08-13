import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { Cart, OrderDto, Payment, PaymentMethod, User } from 'src/app/models/model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  displaySpinner: boolean = false;
  paymentMessage: string = '';
  paymentMessageClass: string = '';
  selectPaymentMethodValue: any = '';
  selectedPaymentMethod = new FormControl('0');
  paymentMethods: PaymentMethod[] = [];
  userCart!: Cart;
  itemsCount: number = 0;
  subscription!: Subscription;
  activeUser!: User;
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

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set Active User
    this.activeUser = this.authService.GetUser();
    // Get Selected PaymentMethod
    this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res == '0') {
        this.selectPaymentMethodValue = '';
      } else {
        this.selectPaymentMethodValue = res?.toString();
      }
    });
    // Get PaymentMethods
    this.subscription = this.orderService
      .GetPaymentMethods()
      .subscribe((res) => {
        this.paymentMethods = res;
      });

    // Get User Cart
    this.subscription = this.cartService
      .getActiveCart(this.activeUser.userId)
      .subscribe((res) => {
        this.userCart = res;
        for(let cartItems of this.userCart.cartItems){
          this.itemsCount += cartItems.salesProduct.quantity;
        }
        // set UserPaymentInfo
        this.cartService.CalculatePayment(this.userCart, this.userPaymentInfo);
      });
  }

  getPaymentMethod(id: string) {
    let x = this.paymentMethods.find((v) => v.id == parseInt(id));
    return x?.type + ' - ' + x?.provider;
  }

  placeOrder() {

    this.displaySpinner = true;
    let isPaymentSuccessfully = this.payMoney();
    if (!isPaymentSuccessfully) {
      this.displaySpinner = false;
      this.paymentMessage = 'Some Thing Went Wrong Payment Did Not Happen!';
      this.paymentMessageClass = 'text-danger';
      return;
    }
    let step = 0;
    let count = timer(0, 3000).subscribe((res) => {
      ++step;
      if (step == 1) {
        this.paymentMessage = 'Processing Payment...';
        this.paymentMessageClass = 'text-info';
      }
      if (step == 2) {
        this.paymentMessage = 'Payment Successfully.. Order Is Being Placed';
        // this.paymentMessageClass = 'text-success';
        this.storeOrder();
      }
      if (step == 3) {
        this.paymentMessage = 'Your Order has Been Placed';
        this.displaySpinner = false;
      }
      if (step == 4) {
        this.router.navigateByUrl('/home');
        count.unsubscribe();
        window.location.reload();
      }
    });
  }
  payMoney(){
    return true;
  }
  storeOrder() {
    let paymentMethod = this.paymentMethods.find((v) => v.id == parseInt(this.selectPaymentMethodValue));
    if(paymentMethod == undefined){
      return this.paymentMessage = 'Please Select Payment Method';
    }else{
     let orderDto:OrderDto={
      UserId:this.activeUser.userId,
      CartId:this.userCart.id,
      PaymentMethod:paymentMethod,
      TotalPrice:this.userPaymentInfo.totalAmount,
      ShippingCharges:this.userPaymentInfo.shippingCharges,
      AmountReduced:this.userPaymentInfo.amountReduce,
      AmountPaid:this.userPaymentInfo.amountPaid
    };
 return this.subscription =this.orderService.SaveOrder(orderDto).subscribe((res)=>{

 }
 )
}
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
