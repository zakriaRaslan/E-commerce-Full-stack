import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryDto } from '../DashboardModels/dashboardModels';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
addCategoryForm!:FormGroup;
formMessage:string=''
formMessageClass:string='';
  constructor(private dashboardService:DashboardService, private fb:FormBuilder){}

  ngOnInit(){
      this.addCategoryForm = this.fb.group({
        category:['',[Validators.required,Validators.maxLength(100),Validators.minLength(3)]],
        subcategory:['',[Validators.required,Validators.maxLength(100),Validators.minLength(3)]],
      })
  }
AddCategory(){
  var categoryName:string =this.Category.value;
  var subcategoryName:string = this.Subcategory.value;
  if(categoryName != '' && subcategoryName !=''){
    var categoryDto:CategoryDto={
      category:categoryName.toLowerCase(),
      subcategory:subcategoryName.toLowerCase(),
}
this.dashboardService.addCategory(categoryDto).subscribe({
  next:(res)=>{
    this.formMessageClass='text-success'
    this.formMessage=res;
    this.addCategoryForm.reset();
  },error:(err)=>{
    this.formMessageClass='text-danger'
    this.formMessage=err.error;
  }
})
}
}

  // formGetters
  get Category():FormControl{
    return this.addCategoryForm.controls['category'] as FormControl
  }
  get Subcategory():FormControl{
    return this.addCategoryForm.controls['subcategory'] as FormControl
  }
}
