import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/interfaces/userRequest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  // * ATRIBUTOS
  @Output() refreshData = new EventEmitter<boolean>();

  formPerfil: FormGroup = this.FormBuilder.group({
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required]
  })

  // * GETTERs and SETTERs
  get firstname() {
    return this.formPerfil.controls['firstname'];
  }

  get lastname() {
    return this.formPerfil.controls['lastname'];
  }

  // * CONSTRUCTOR
  constructor(
    private FormBuilder: FormBuilder,
    private LoginService: LoginService,
    private AuthService: AuthService,
    private ToastService: ToastService
  ) { }

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.formPerfil.patchValue({
        'firstname': this.AuthService.userData?.firstname,
        'lastname': this.AuthService.userData?.lastname
      });
    }, 500);
  }

  // * METHODs
  //#region 
  
    /**
     * Cierre de Modal
     */
    closeModal() {
      const modal = document.getElementById('crud-modal');
      modal?.classList.add('hidden');
    }
  
    /**
     * Envio usuario modificado
     */
    updateDataUser() {
      if (this.formPerfil.valid) {
        this.ToastService.showOverlay = true;
        let aux: UserRequest = {
          username: this.AuthService.userData?.username,
          password: this.AuthService.userData?.password,
          id: this.AuthService.userData?.id,
          firstname: this.formPerfil.get('firstname')?.value,
          lastname: this.formPerfil.get('lastname')?.value,
          type_user: this.AuthService.userData?.type_user,
          state: this.AuthService.userData?.state,
          role: this.AuthService.userData?.role
        }
  
        this.AuthService.svUpdateUser(aux).subscribe();
      } else {
        this.formPerfil.markAllAsTouched();
      }
  
      setTimeout(() => {
        this.ToastService.showOverlay = false;
        this.refreshData.emit(true);
        this.closeModal();
      }, 2000);
    }
  //#endregion

}
