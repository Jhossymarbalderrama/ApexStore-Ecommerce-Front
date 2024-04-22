import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-shopping-cart',
  templateUrl: './dashboard-shopping-cart.component.html',
  styleUrls: ['./dashboard-shopping-cart.component.css']
})
export class DashboardShoppingCartComponent {
  
  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService
  ) {
    // this.LoginService.checkTokenExpiration();
  }
}
