import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { NavigationService } from 'src/app/Services/navigation.service';
import { ReviewService } from 'src/app/Services/review.service';
import { UtilityService } from 'src/app/Services/utility.service';
import {
  InsertItemToCartModel,
  Product,
  Review,
  ShowReview,
  reviewResponse,
} from 'src/app/models/model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  imgIndex: number = 1;
  product!: Product;
  ProductAllowedQuantity: number = 0;
  ProductQuantity = new FormControl('');
  AddToCartMessage: string = '';
  AddToCartClass:string ='';
  reviewControl = new FormControl('');
  emptyReviewError: boolean = false;
  LoggedInError: boolean = false;
  reviewSaved: boolean = false;
  errorMessage: string = '';
  reviews: reviewResponse[] = [];
  reviewError: string = '';
  constructor(
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    public utilityService: UtilityService,
    public authService: AuthService,
    private reviewService: ReviewService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProductById(id).subscribe((res) => {
        this.product = res;
        this.ProductAllowedQuantity = res.quantity;
        this.GetAllReviews();
      });
    });
  }

  SaveReview() {
    let reviewValue = this.reviewControl.value;
    if (reviewValue === '' || reviewValue == null) {
      this.emptyReviewError = true;
      return;
    }
    if (!this.authService.IsLoggedIn()) {
      this.LoggedInError = true;
      return;
    }
    let user = this.authService.GetUser();
    let review: Review = {
      userId: user.userId,
      productId: this.product.productId,
      reviewValue: reviewValue,
    };
    this.reviewService.AddReview(review).subscribe({
      next: (res) => {
        this.reviewSaved = true;
        this.reviewControl.setValue('');
        this.GetAllReviews();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }
  clearMessages() {
    this.emptyReviewError = false;
    this.LoggedInError = false;
    this.reviewSaved = false;
    this.errorMessage = '';
  }

  GetAllReviews() {
    this.reviews = [];
    this.reviewService
      .GetProductReviews(this.product.productId)
      .subscribe((res: any) => {
        for (let review of res) {
          this.reviews.push(review);
        }
      });
  }

  AddToCart() {
    this.AddToCartMessage ="";
    if(this.ProductQuantity.value ==null || parseInt(this.ProductQuantity.value)<= 0 || this.ProductQuantity.value==""){
      this.AddToCartClass = 'text-danger'
      return this.AddToCartMessage = "Please enter a valid quantity";
    }else if(parseInt(this.ProductQuantity.value)>this.ProductAllowedQuantity){
      this.AddToCartClass = 'text-danger'
      return this.AddToCartMessage ="Sorry We Don`t Have This Quantity For This Product.. "
    }

    let InsertItemModel:InsertItemToCartModel ={
      userId:this.authService.GetUser().userId,
      productId:this.product.productId,
      quantity:parseInt(this.ProductQuantity.value)
     }

   return this.cartService.InsertItemToCart(InsertItemModel).subscribe({
    next:(res) => {
        this.cartService.changeCart.next(1);
        this.AddToCartClass = 'text-success'
        this.AddToCartMessage = 'Add To cart Successfully'
        this.ProductQuantity.reset();
    },
    error : (err) =>{
      this.AddToCartClass = 'text-danger';
      this.AddToCartMessage = 'Some Thing Went Wrong';
    }
   })

  }


}
