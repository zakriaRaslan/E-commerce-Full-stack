import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product } from '../models/model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  baseUrl: string = 'https://localhost:7197/api/Shopping/';
  constructor(private http: HttpClient) {}

  getCategoryList() {
    let Url = this.baseUrl + 'product-categorylist';
    return this.http.get<any[]>(Url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            categoryId: category.id,
            category: category.category,
            subcategory: category.subcategory,
          };
          return mappedCategory;
        })
      )
    );
  }

  getProducts(category: string, subCategory: string, count: number) {
    return this.http.get<any[]>(this.baseUrl + 'get-products',{
      params: new HttpParams()
        .set('category', category)
        .set('subCategory', subCategory)
        .set('count', count),
    });
  }

  getProductById(id:number){
    let url = this.baseUrl + "GetProduct" + id;
    return this.http.get<Product>(url);
  }
}
