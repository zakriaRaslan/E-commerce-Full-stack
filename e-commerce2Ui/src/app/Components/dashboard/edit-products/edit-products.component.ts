import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent implements OnInit {
  products: Product[] = [];
  subCategories:string[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
  ) {}

  ngOnInit() {
    this.navigationService.getCategoryList().subscribe((res)=>{
      for(let category of res){
        this.subCategories.push(category.subcategory);
      }
    })

    this.activatedRoute.queryParams.subscribe((params: any) => {
      let subcategory = params.subcategory;
      if (subcategory) {
        this.navigationService
          .getProductsBySubCategory(subcategory)
          .subscribe((res) => {
            this.products = res;
          });
      }
    });
  }
}
