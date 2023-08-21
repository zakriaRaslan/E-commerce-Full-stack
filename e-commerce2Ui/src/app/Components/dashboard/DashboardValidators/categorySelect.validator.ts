import { FormGroup } from "@angular/forms";

export function CategoryIdSelectValidator(controllerName:string){
return(formGroup:FormGroup)=>{
  const categoryId = formGroup.controls[controllerName];
  if(categoryId.errors && !categoryId.errors['requiredCategory']){
    return;
  }
  if(categoryId.value == null || categoryId.value == 0 || categoryId.value == ''){
    categoryId.setErrors({requiredCategory:true});
  }else{
    categoryId.setErrors(null);
  }
}
}
