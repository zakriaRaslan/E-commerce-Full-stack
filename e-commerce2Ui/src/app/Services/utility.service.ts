import { Injectable } from '@angular/core';
import { Cart } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  PriceToPaid(cart: Cart) {
    let priceToPaid = 0;
    for (let cartItem of cart.cartItems) {
      priceToPaid += this.applyDiscount(
        cartItem.salesProduct.price,
        cartItem.salesProduct.discount
      );
    }
    return priceToPaid;
  }
}
