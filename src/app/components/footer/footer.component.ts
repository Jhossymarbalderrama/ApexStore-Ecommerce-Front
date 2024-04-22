import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // * CONSTRUCTOR
  constructor(
    private router: Router
  ){

  }

  // * METHODS
  onStore(){
    this.router.navigateByUrl('store');
  }
}
