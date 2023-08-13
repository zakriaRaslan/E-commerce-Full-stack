import {
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Category, NavigationItem } from 'src/app/models/model';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from 'src/app/Services/navigation.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })  container!: ViewContainerRef;
  navigationList: NavigationItem[] = [];
  cartItems : number = 0 ;
  constructor(
    private router: Router,
    private navigationServ: NavigationService,
    public authService: AuthService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.navigationServ.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subCategory.push(item.subcategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subCategory: [item.subcategory],
          });
        }
      }
    });
    this.cartService.changeCart.subscribe((res:any)=>{
      this.cartItems += parseInt(res);
    })
    if(this.authService.IsLoggedIn()){
      this.cartService.getActiveCart(this.authService.GetUser().userId).subscribe((res)=>{
        if(res.cartItems.length != 0){
        this.cartItems = res.cartItems.length;
      }
      })
    }
  }

  Home() {
    this.router.navigate(['/home']);
  }
  OpenModal(name: string) {
    this.container.clear();
    let componentType: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
      this.container.createComponent(componentType);
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
      this.container.createComponent(componentType);
    }
  }
  LogOut() {
    this.authService.logout();
  }
}
