import { Component,Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/Services/navigation.service';
import { Category, Product } from 'src/app/models/model';

@Component({
  selector: 'app-suggested-product',
  templateUrl: './suggested-product.component.html',
  styleUrls: ['./suggested-product.component.css']
})
export class SuggestedProductComponent implements OnInit {
@Input() productCount: number=3;
@Input() category:Category={
  categoryId:0,
  category:'',
  subcategory:'',
}
products:Product[]=[];
constructor(private navigationService:NavigationService){}
ngOnInit(): void {
    this.navigationService.getProducts(this.category.category,this.category.subcategory,this.productCount).subscribe((res:any)=>{
      for(let product of res){
        this.products.push(product);
      }
    })
}
}
