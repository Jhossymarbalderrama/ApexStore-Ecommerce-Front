import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enums/Role';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  // * ATRIBUTOS
  dashboardUser: boolean = false;
  userIMG: string = '../../../../assets/img/dashboard/user.jpg'; // ! Sacar esto y poner la imagen que tiene el Usuario

  // * CONSTRUCTOR
  constructor(private router: Router, public AuthService: AuthService) { 
   
  }

  // * METHODs
  /**
   * Ir a la pantalla de mi perfil
   */
  onProfile() {
    this.router.navigateByUrl('dashboard/profile');
  }
}
