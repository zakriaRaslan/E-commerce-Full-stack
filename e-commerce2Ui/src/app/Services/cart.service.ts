import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
changeCart=new Subject();
BaseUrl:string="https://localhost:7197/api/Cart/"
  constructor(private http:HttpClient,private authServes:AuthService) { }

 AddToCart(product:Product){
 let productId = product.productId;
 let userId = this.authServes.GetUser().userId
this.InsertCartItem(userId,productId).subscribe((res)=>{
  if(res.toString()=="Inserted"){
    this.changeCart.next(1);
  }
})
 }

 InsertCartItem(userId:string,productId:number){
let url = `${this.BaseUrl}add/${userId}/${productId}`
return this.http.post(url,null,{responseType:'text'});
 }
}
