import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName:string,matchingControlName:string){
  return(formGroup:FormGroup)=>{
    const password = formGroup.controls[controlName];
    const confirmPassword =formGroup.controls[matchingControlName];
    if(confirmPassword.errors && !confirmPassword.errors['confirmPassword']){
      return;
    }
    if(password.value!== confirmPassword.value){
      confirmPassword.setErrors({confirmPassword:true});
    }else{
      confirmPassword.setErrors(null);
    }
  }
}
