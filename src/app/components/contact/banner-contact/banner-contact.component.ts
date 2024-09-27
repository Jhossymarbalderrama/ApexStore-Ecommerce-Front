import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-banner-contact',
  templateUrl: './banner-contact.component.html',
  styleUrls: ['./banner-contact.component.css']
})
export class BannerContactComponent {

  title: string = "";
  constructor(private data: DataService){
    this.title = data.getDataContact.title;
  }
}
