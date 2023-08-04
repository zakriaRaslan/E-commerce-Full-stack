import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  imgIndex: number = 1;
  product!: Product;
  reviewControl= new FormControl('');
  emptyReviewError:boolean=false;
  constructor(
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      let id = params.id;
      this.navigationService.getProductById(id).subscribe((res)=>{
        this.product=res;
      })
    })
  }

  saveReview(){
    let review = this.reviewControl.value;
    if(review === '' || review==null){
      this.emptyReviewError=true;
      return;
    }
  }
}
