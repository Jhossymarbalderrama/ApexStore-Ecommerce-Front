import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { initFlowbite } from 'flowbite';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public dashboardUser: boolean = true;

  constructor(
    private router: Router, 
    private LoginService: LoginService, 
    private elementRef: ElementRef,
    public ToastService: ToastService
  ) {  

    initFlowbite(); // * Flowbite components https://flowbite.com/

    this.LoginService.checkTokenExpiration();

    /**
     * ? View/Hidden Header && Footer si no esta en el dashboard administrador
     */
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const yOffset = window.scrollY;
    const btnToTop = (<HTMLElement>document.querySelector('#icon-up'));

    if (yOffset <= 100){
      btnToTop?.classList.add('icon-up')
    }else{
      btnToTop?.classList.remove('icon-up')
    }
  }

  toUpHeader(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
