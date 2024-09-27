import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enums/Role';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  // * ATRIBUTOS
  dashboardUser: boolean = false;
  userIMG: string = '../../../../assets/img/dashboard/user.jpg'; // ! Sacar esto y poner la imagen que tiene el Usuario
  estaEnPerfil: boolean = false;
  logo_site: string = '../../../../assets/logo-bcd.png';

  // * CONSTRUCTOR
  constructor(
    public router: Router, 
    public AuthService: AuthService,
    public UrlService: UrlService
  ) {

  }

  // * METHODs
  /**
   * Ir a la pantalla de mi perfil
   */
  onProfile() {
    this.router.navigateByUrl('dashboard/profile');
  }

  navClose() {
    const offCanvas = document.getElementById('offCanvas'); // ! El Contenedor del Menu
    const menuDashboard = document.getElementById('menu-dashboard'); // ! Menu Btn Toggle
    const iconClose = document.getElementById('icon-close'); // ? Icon Close
    const iconUserShield = document.getElementById('icon-user-shield'); // ? Icon ADM Shield

    // ? Cierro el Nav cuando voy a una ruta en el dashboard
    offCanvas?.classList.remove('offcanvas');
    offCanvas?.classList.remove('block');
    offCanvas?.classList.add('hidden');
    menuDashboard?.classList.remove('menu-dashboard-move');

    // Icon
    iconClose?.classList.remove('block');
    iconClose?.classList.add('hidden');
    iconUserShield?.classList.add('block');
    iconUserShield?.classList.remove('hidden');
  }
}
