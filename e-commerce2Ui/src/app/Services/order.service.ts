import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/model';

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

}
