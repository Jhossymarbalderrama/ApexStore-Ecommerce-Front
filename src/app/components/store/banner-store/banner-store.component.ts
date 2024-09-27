import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-banner-store',
  templateUrl: './banner-store.component.html',
  styleUrls: ['./banner-store.component.css']
})
export class BannerStoreComponent {

  title: string = "";

  constructor(private data: DataService){
    this.title = data.getTitleStore;
  }
}
