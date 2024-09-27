import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  data_contact: any;

  constructor(private data: DataService){
    this.data_contact = data.getDataContact;
  }
}
