import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../Services/dashboard.service';
import { OfferDto } from '../DashboardModels/dashboardModels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  subscription!:Subscription;
addOfferForm!:FormGroup;
addOfferMessage:string='';
addOfferMessageClass:string='';
  constructor(private dashService:DashboardService,private fb:FormBuilder) {}

  ngOnInit(){
      this.addOfferForm=this.fb.group({
        title:['',[Validators.required,Validators.maxLength(100),Validators.minLength(3)]],
        discount:['',[Validators.required,Validators.max(99),Validators.min(1)]]
      })
  }

AddOffer(){
  var model:OfferDto={
    title:this.Title.value,
    discount:this.Discount.value
  }
this.subscription = this.dashService.addOffer(model).subscribe({
  next:(res:any)=>{
    this.addOfferMessageClass='text-success';
    this.addOfferMessage = res.message;
    this.addOfferForm.reset();
  },error:(err)=>{
    this.addOfferMessageClass='text-danger';
    this.addOfferMessage = err.error;
  }
}
)
}


  // GettersRegion
  get Title():FormControl{
    return this.addOfferForm.controls['title'] as FormControl;
  }
  get Discount():FormControl{
    return  this.addOfferForm.controls["discount"]as FormControl ;
  }
}
