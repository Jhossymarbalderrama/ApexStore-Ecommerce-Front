import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { UrlService } from 'src/app/services/url.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit, AfterViewInit {

  // * ATRIBUTOS
  modalView: boolean = false;

  // * CONSTRUCTOR
  constructor(
    public AuthService: AuthService,
    private LoginService: LoginService,
    public UrlService: UrlService
  ) {
    // this.LoginService.checkTokenExpiration();
    // if (!this.AuthService.userData) {      
    //   this.refreshData(true);
    // } 
  }
  
  ngAfterViewInit(): void {}

  ngOnInit(): void {}


  // * METHODs
  /**
   * Muestro modal de edicion de datos
   */
  showModal(){
    const modal = document.getElementById('crud-modal');
    modal?.classList.remove('hidden');
  }

  /**
   * Obtengo la informacion del usuario logeado
   * @param $event 
   */
  refreshData($event: any){    
    // this.AuthService.svDetailsUser(localStorage.getItem('userLogin') as string).subscribe();
    // this.AuthService.svDetailsUserID(localStorage.getItem('idUser') as any);
  }
}
