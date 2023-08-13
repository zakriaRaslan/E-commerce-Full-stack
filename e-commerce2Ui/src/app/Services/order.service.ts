import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto, PaymentMethod } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
BaseUrl:string="https://localhost:7197/api/Order/"
  constructor(private http:HttpClient) { }

  GetPaymentMethods(){
    let url =`${this.BaseUrl}get-payment-methods`
    return this.http.get<PaymentMethod[]>(url)
  }

  SaveOrder(orderDto:OrderDto){
    let url =`${this.BaseUrl}save-order`
    return this.http.post<OrderDto>(url,orderDto)
  }

}
