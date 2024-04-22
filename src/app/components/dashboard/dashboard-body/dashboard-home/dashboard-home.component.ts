import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {

  // * CONSTRUCTOR
  constructor(
    public AuthService: AuthService,
    private LoginService: LoginService
  ){
    // this.LoginService.checkTokenExpiration();
  }
}
