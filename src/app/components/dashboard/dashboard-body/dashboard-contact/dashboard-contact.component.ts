import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-contact',
  templateUrl: './dashboard-contact.component.html',
  styleUrls: ['./dashboard-contact.component.css']
})
export class DashboardContactComponent {

  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService
  ) {
    // this.LoginService.checkTokenExpiration();
  }
}
