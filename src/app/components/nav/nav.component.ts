import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  // * CONSTRUCTOR
  constructor(
    public loginServ: LoginService,
    private Router: Router
  ) {

  }

  ngHiddenNavbar() {
    document.getElementById('navbar-cta')?.classList.add('hidden'); 
  }
}
