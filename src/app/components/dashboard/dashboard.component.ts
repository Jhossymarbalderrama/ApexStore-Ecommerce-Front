import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // * ATRIBUTOS
  errorMessage: String = ""; // ? mensaje de error
  user?: User; // ? Datos del usuario
  userLoginOn: boolean = false; // ? validacion de usuario logeado
  editMode: boolean = false; // ?  validacion de modo de edicion de datos
  menuOpen: boolean = true;

  // * CONSTRUCTOR
  constructor(
    public AuthService: AuthService,
    private LoginService: LoginService
  ) { }

  ngOnInit(): void { }

  // * METHODs
  //#region 

  /**
   * LLamo a esta funcion cuando quiero modificar los datos del formulario que son los del usuario Logiado
   */
  saveUserDetailsData() {
    //FormValidoUserDetails
    if (true) {
      //Envio el valor del Formulario {}
      this.AuthService.svUpdateUser({} as User).subscribe(
        {
          next: () => {
            this.editMode = false;
          },
          error: (error) => {
            console.error(error);
          }
        }
      );
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const offCanvas = document.getElementById('offCanvas'); // ! El Contenedor del Menu
    const menuDashboard = document.getElementById('menu-dashboard'); // ! Menu Btn Toggle
    const iconClose = document.getElementById('icon-close'); // ? Icon Close
    const iconUserShield = document.getElementById('icon-user-shield'); // ? Icon ADM Shield

    if(this.menuOpen){
      // Cerrado
      offCanvas?.classList.remove('offcanvas');
      offCanvas?.classList.remove('block');
      offCanvas?.classList.add('hidden');
      menuDashboard?.classList.remove('menu-dashboard-move');

      // Icon
      iconClose?.classList.remove('block');
      iconClose?.classList.add('hidden');
      iconUserShield?.classList.add('block');
      iconUserShield?.classList.remove('hidden');
    }else{
      // Abierto
      offCanvas?.classList.add('offcanvas');
      offCanvas?.classList.remove('hidden');
      offCanvas?.classList.add('block');
      menuDashboard?.classList.add('menu-dashboard-move');

      // Icon
      iconClose?.classList.remove('hidden');
      iconClose?.classList.add('block');
      iconUserShield?.classList.add('hidden');
      iconUserShield?.classList.remove('block');
    }
  }

  /**
   * Cambio el metodo de vista (Edicion | Solo lectura)
   */
  modeChange(): void {
    this.editMode = !this.editMode;
  }

  
  //#endregion
}
