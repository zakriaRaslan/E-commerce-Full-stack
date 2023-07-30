import { Component,Input } from '@angular/core';
import { Category } from 'src/app/models/model';

@Component({
  selector: 'app-suggested-product',
  templateUrl: './suggested-product.component.html',
  styleUrls: ['./suggested-product.component.css']
})
export class SuggestedProductComponent {
@Input() productCount: number=3;
@Input() category:Category={
  id:0,
  category:'',
  subcategory:'',
}

constructor(){}

}
