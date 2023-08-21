import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[SubCategoryProducts]'
})
export class OpenProductsBySubcategoryDirective {
@Input()subCategory:string=''
  constructor(private router:Router) { }
@HostListener('click')subCategoryProducts(){
  this.router.navigate(['edit-product'],{
    queryParams:{subcategory:this.subCategory}
  })
}
}
