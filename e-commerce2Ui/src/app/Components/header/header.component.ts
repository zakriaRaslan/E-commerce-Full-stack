import { Component, ElementRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from 'src/app/models/model';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('modalTitle')modalTitle!:ElementRef;
  @ViewChild('container',{read:ViewContainerRef,static:true})container!:ViewContainerRef;
navigationList:NavigationItem[]=[
  {
    category:'Electronics',
    subCategory:['Mobiles',"Laptops"],
  },
  {
    category:"Furniture",
    subCategory:["Chairs","Tables"]
  }
];
constructor(private router:Router){}

Home(){
this.router.navigate(['/home']);
}
OpenModal(name:string){
this.container.clear();
let componentType:Type<any>;
if(name==='login'){
  componentType=LoginComponent;
  this.modalTitle.nativeElement.textContent='Enter Login Information';
  this.container.createComponent(componentType)
}
if(name==='register'){
  componentType=RegisterComponent;
  this.modalTitle.nativeElement.textContent='Enter Register Information';
  this.container.createComponent(componentType)
}


}
}
