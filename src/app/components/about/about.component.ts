import { Component } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(public UrlService: UrlService){

  }
}
