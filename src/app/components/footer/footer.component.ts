import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // * CONSTRUCTOR
  constructor(
    private router: Router,
    public UrlService: UrlService
  ){

  }

  // * METHODS
  onStore(){
    this.router.navigateByUrl('store');
  }
}
