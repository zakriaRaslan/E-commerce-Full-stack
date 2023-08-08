import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortBy: 'default' | 'htl' | 'lth' = 'default';
  products: Product[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let category = params.category;
      let subcategory = params.subcategory;
      if (category && subcategory) {
        this.navigationService
          .getProducts(category, subcategory, 10)
          .subscribe((res) => {
            this.products = res;
          });
      }
    });
  }

  sortByPrice(sortKey: string) {
    this.products.sort((a, b) => {
      if (sortKey === 'default') {
        return a.productId > b.productId ? 1 : -1;
      }
      if (sortKey === 'htl') {
        if (
          this.utilityService.applyDiscount(a.price, a.offer.discount) >
          this.utilityService.applyDiscount(b.price, b.offer.discount)
        ) {
          return -1;
        } else {
          return 1;
        }
      }
      if (sortKey === 'lth') {
        if (
          this.utilityService.applyDiscount(a.price, a.offer.discount) >
          this.utilityService.applyDiscount(b.price, b.offer.discount)
        ) {
          return 1;
        } else {
          return -1;
        }
      }

      return 0;
    });
  }
}
