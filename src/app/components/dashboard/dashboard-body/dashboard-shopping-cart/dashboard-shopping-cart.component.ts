import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-shopping-cart',
  templateUrl: './dashboard-shopping-cart.component.html',
  styleUrls: ['./dashboard-shopping-cart.component.css']
})
export class DashboardShoppingCartComponent {
  
  cartEmpty: boolean = true;

  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService,
    private CartService: CartService
  ) {
    // this.LoginService.checkTokenExpiration();
    this.CartService.cart_cant_product === 0 ? this.cartEmpty = true : this.cartEmpty= false;
  }
}
