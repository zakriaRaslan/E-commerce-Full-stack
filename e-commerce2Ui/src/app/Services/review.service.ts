import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
baseUrl:string="https://localhost:7197/api/Review/"
  constructor(private http:HttpClient) { }

AddReview(review:Review){
  let url = `${this.baseUrl}add`;
  return this.http.post(url,review);
}
GetProductReviews(productId:number){
let url = `${this.baseUrl}get-product-reviews/${productId}`
return this.http.get<Review>(url);
}
}
