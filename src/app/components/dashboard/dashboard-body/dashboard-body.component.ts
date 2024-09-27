import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements AfterViewInit{

  constructor(private elementRef: ElementRef){
    
  }

  ngAfterViewInit(): void {
    // let header = this.elementRef.nativeElement.querySelector('#header');
    // if (header) {
    //   header.style.position = 'relative';
    // }
  }
}
