import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/Services/navigation.service';
import { NavigationItem, Product, Category } from 'src/app/models/model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  navigationList: NavigationItem[] = [];
  products: Product[] = [];
  subCategories:string[]=[];
  subcategory:string='mobiles'
  subscription!:Subscription
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
  ) {}

 async ngOnInit() {
  this.navigationService.getCategoryList().subscribe((list: Category[]) => {
    for (let item of list) {
      let present = false;
      for (let navItem of this.navigationList) {
        if (navItem.category === item.category) {
          navItem.subCategory.push(item.subcategory);
          present = true;
        }
      }
      if (!present) {
        this.navigationList.push({
          category: item.category,
          subCategory: [item.subcategory],
        });
      }
    }
  });
    this.navigationService.getCategoryList().subscribe((res)=>{
      for(let category of res){
        this.subCategories.push(category.subcategory);
      }
    })



      console.log(this.products);
      }

      SelectCategory(selectedSubcategory:string){
        this.products=[];
       this.navigationService.getProductsBySubCategory(selectedSubcategory).subscribe({
          next:(res)=>{
            for(let product of res){
              this.products.push(product);
            }
            },error:(err)=>{
              console.log(err.error)
          }
        })
      }
  }

