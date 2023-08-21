import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Offer } from 'src/app/models/model';
import { AddProductDto, CategoryDto } from '../DashboardModels/dashboardModels';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
BaseUrl:string ='https://localhost:7197/api/Dashboard/'
  constructor(private http:HttpClient) { }

  getCategoriesList(){
    let url =`${this.BaseUrl}get-categories`
    return this.http.get<Category[]>(url);
  }

  getAvailableOffers(){
    let url =`${this.BaseUrl}get-offers`;
    return this.http.get<Offer[]>(url);
  }

  addProduct(model:AddProductDto){
    let url = `${this.BaseUrl}add-product`
    return this.http.post(url,model);
  }

  addCategory(model:CategoryDto){
    let url =`${this.BaseUrl}add-category`;
    return this.http.post(url,model);
  }
}
