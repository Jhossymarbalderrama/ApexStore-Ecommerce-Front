import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-banner-about',
  templateUrl: './banner-about.component.html',
  styleUrls: ['./banner-about.component.css']
})
export class BannerAboutComponent {

  title: string = "";
  constructor(
    private data: DataService
  ){
    this.title = data.getTitleAbout;
  }
}
