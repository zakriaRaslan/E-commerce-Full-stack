import { FormGroup } from "@angular/forms";

export function DescriptionValidator(controlName:string){
  return (formGroup:FormGroup)=>{
    const description = formGroup.controls[controlName];
    if(description.errors && !description.errors['requiredDescription']){
      return;
    }
    if(description.value.length < 10){
      description.setErrors({requiredDescription:true});
    }else{
      description.setErrors(null);
    }
  }
}
