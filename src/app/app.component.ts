import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public dashboardUser: boolean = false;

  constructor(private router: Router, private LoginService: LoginService) {  

    initFlowbite(); // * Flowbite components https://flowbite.com/

    this.LoginService.checkTokenExpiration();
    this.router.events.subscribe((event) => {      
      if (event instanceof NavigationEnd) {       
        let ruta= this.router.url.split('/');

        if('/'+ruta[1] == '/dashboard'){
          this.dashboardUser = false;          
        }else{
          this.dashboardUser = true;          
        }
      }
    });      
  }


  ngOnInit(): void {

  }  
}
