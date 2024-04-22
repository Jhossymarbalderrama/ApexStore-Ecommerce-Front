import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-articles',
  templateUrl: './dashboard-articles.component.html',
  styleUrls: ['./dashboard-articles.component.css']
})
export class DashboardArticlesComponent {

  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService
  ) {
    // this.LoginService.checkTokenExpiration();
  }
}
