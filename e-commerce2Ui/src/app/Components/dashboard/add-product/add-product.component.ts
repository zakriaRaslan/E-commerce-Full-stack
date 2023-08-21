import { Component, OnInit } from '@angular/core';
import { Category, Offer } from 'src/app/models/model';
import { DashboardService } from '../Services/dashboard.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductDto } from '../DashboardModels/dashboardModels';
import { catchError } from 'rxjs';
import { DescriptionValidator } from '../DashboardValidators/description.validator';
import { CategoryIdSelectValidator } from '../DashboardValidators/categorySelect.validator';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
categoryList:Category[]=[];
OffersList:Offer[]=[];
addProductMessages:string='';
addProductForm!:FormGroup;
messageClass:string=''
  constructor(private dashboardService:DashboardService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.addProductForm= this.fb.group({
      title:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      imageName:['',Validators.required],
      categoryId:[''],
      offerId:[''],
      description:['']
    },{validators:[DescriptionValidator('description'),CategoryIdSelectValidator('categoryId')]})

    this.dashboardService.getCategoriesList().subscribe((res)=>{
    for(let item of res){
      this.categoryList.push(item)
    }
  },
  )
this.dashboardService.getAvailableOffers().subscribe((res)=>{
  for(let offer of res){
    this.OffersList.push(offer)
  }
})
  }
  AddProduct(){
    let addProductDto:AddProductDto={
      title : this.Title.value,
      price : this.Price.value,
      quantity : this.Quantity.value,
      imageName : this.ImageName.value,
      description : this.Description.value,
      categoryId : parseInt(this.CategoryId.value),
      offerId :parseInt(this.OfferId.value),
    }
    if(Number.isNaN(addProductDto.offerId)){
    addProductDto.offerId=0;
    }
    this.dashboardService.addProduct(addProductDto).subscribe()
 this.addProductForm.reset();
 this.addProductMessages = 'Product Added Successfully';
  }

// Getters Region
get Title():FormControl{
  return this.addProductForm.get('title') as FormControl
}
get Price():FormControl{
  return this.addProductForm.get('price') as FormControl
}
get ImageName():FormControl{
  return this.addProductForm.get('imageName') as FormControl
}
get Quantity():FormControl{
  return this.addProductForm.get('quantity') as FormControl
}
get CategoryId():FormControl{
  return this.addProductForm.get('categoryId') as FormControl
}
get OfferId():FormControl{
  return this.addProductForm.get('offerId') as FormControl
}
get Description():FormControl{
  return this.addProductForm.get('description') as FormControl
}

}
