import { Component, HostListener, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // * ATRIBUTOS
  btnLogin?: string;

  // * CONSTRUCTOR
  constructor(
    private elementRef: ElementRef,
    public authServ: AuthService,
    public cartServ: CartService,
    public loginServ: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  // * METHODS
  //#region 
  navigateURL(): void {    
    if (this.loginServ._svCurrentUserLoginOn.value) {
      this.loginServ.svLogout();
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  @HostListener('window: scroll', ['$event'])
  onScroll(event: Event): void {
    const yOffset = window.scrollY;

    if (yOffset > 20) {
      (this.elementRef.nativeElement.querySelector('#header')).classList.add('navbar-solid');
    } else {
      (this.elementRef.nativeElement.querySelector('#header')).classList.remove('navbar-solid');
    }
  }

  viewInfoCart() {
    if (this.cartServ.cart_cant_product != 0) {
      if (this.loginServ._svCurrentUserLoginOn.value) {
        this.router.navigateByUrl('/dashboard/shopping-cart');
      } else {
        this.router.navigateByUrl('/cart-info');
      }
    }
  }

  onDashboard() {
    this.router.navigateByUrl('/dashboard/profile');
  }
  //#endregion
}
