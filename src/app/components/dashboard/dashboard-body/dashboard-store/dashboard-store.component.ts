import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-store',
  templateUrl: './dashboard-store.component.html',
  styleUrls: ['./dashboard-store.component.css']
})
export class DashboardStoreComponent {

  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService
  ) {
    // this.LoginService.checkTokenExpiration();
  }

}
