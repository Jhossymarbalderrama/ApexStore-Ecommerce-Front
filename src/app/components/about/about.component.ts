import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  data_about:any;

  constructor(
    public data: DataService
  ){
    this.data_about = data.getDataAbout;
  }
}
