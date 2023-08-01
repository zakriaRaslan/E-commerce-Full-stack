import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
baseUrl:string="https://localhost:7197/api/Shopping/"
  constructor(private http:HttpClient) { }

  getCategoryList(){
    let Url = this.baseUrl + "product-categorylist"
    return this.http.get<any[]>(Url).pipe(
      map((categories)=>categories.map((category)=>{
        let mappedCategory:Category={
          id:category.id,
          category:category.category,
          subcategory:category.subCategory
        };
        return mappedCategory
      })

      )
    )
  }
}
