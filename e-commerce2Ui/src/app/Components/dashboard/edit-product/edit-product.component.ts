import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { NavigationService } from 'src/app/Services/navigation.service';
import { Category, Offer, Product } from 'src/app/models/model';
import { CategoryIdSelectValidator } from '../DashboardValidators/categorySelect.validator';
import { DescriptionValidator } from '../DashboardValidators/description.validator';
import { DashboardService } from '../Services/dashboard.service';
import { AddProductDto} from '../DashboardModels/dashboardModels';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

categoryList:Category[]=[];
OffersList:Offer[]=[];
product!:Product|undefined;
productId:number=0
ProductForm!:FormGroup;
ProductMessages:string='';
messageClass:string=''
  constructor(private dashboardService:DashboardService ,private navigationService:NavigationService , private router:Router,private activateRoute:ActivatedRoute ,private fb:FormBuilder ){}

 async ngOnInit():Promise<void>{
    let activateProductId = this.activateRoute.snapshot.paramMap.get('productId')
    if(activateProductId != null){
       this.productId = parseInt(activateProductId);
    }

    this.product = await this.navigationService.getProductById(this.productId).pipe(take(1)).toPromise();
    console.log(this.product);

    this.ProductForm=this.fb.group({
      title:[this.product?.title,Validators.required],
      price:[this.product?.price,Validators.required],
      quantity:[this.product?.quantity,Validators.required],
      imageName:[this.product?.imageName,Validators.required],
      categoryId:[{value:this.product?.category.categoryId,disabled:true}],
      offerId:[this.product?.offer.offerId],
      description:[this.product?.description]
    },{validators:[DescriptionValidator('description'),CategoryIdSelectValidator('categoryId')]})

    this.dashboardService.getCategoriesList().subscribe((res)=>{
      for(let item of res){
        this.categoryList.push(item)
      }
    },
    );

    this.dashboardService.getAvailableOffers().subscribe((res)=>{
      for(let offer of res){
        this.OffersList.push(offer)
      }
    });
  }

EditProduct(){
  if(this.product != null){
    if(this.product.description==this.Description.value && this.product.imageName==this.ImageName.value && this.product.offer.offerId==this.OfferId.value && this.product.price==this.Price.value && this.product.title==this.Title.value&& this.product.quantity==this.Quantity.value){
      this.messageClass='text-warning';
      this.ProductMessages='There Is No Any Change'
      return;
    }
    let modifiedProduct:AddProductDto={
      productId : this.productId,
      title:this.Title.value,
      price:this.Price.value,
      description:this.Description.value,
      quantity:this.Quantity.value,
      imageName:this.ImageName.value,
     categoryId:parseInt(this.CategoryId.value),
     offerId:parseInt(this.OfferId.value)
    }
this.dashboardService.ModifyProduct(modifiedProduct).subscribe({
  next:(res:any)=>{
    this.messageClass='text-success';
    this.ProductMessages=res.message;
  },error:(err)=>{
    this.messageClass='text-danger';
    this.ProductMessages=err.error;
  }
})
  }

}


  // Getters Region
get Title():FormControl{
  return this.ProductForm.get('title') as FormControl
}
get Price():FormControl{
  return this.ProductForm.get('price') as FormControl
}
get ImageName():FormControl{
  return this.ProductForm.get('imageName') as FormControl
}
get Quantity():FormControl{
  return this.ProductForm.get('quantity') as FormControl
}
get CategoryId():FormControl{
  return this.ProductForm.get('categoryId') as FormControl
}
get OfferId():FormControl{
  return this.ProductForm.get('offerId') as FormControl
}
get Description():FormControl{
  return this.ProductForm.get('description') as FormControl
}
// End
}
