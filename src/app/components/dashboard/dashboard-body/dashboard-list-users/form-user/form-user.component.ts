import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/enums/Role';
import { StateUser } from 'src/app/enums/StateUser';
import { CrudForm } from 'src/app/interfaces/crudForm';
import { UserRequest } from 'src/app/interfaces/userRequest';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  // * ATRIBUTOS
  //#region 
  @Output() refreshListUsers: EventEmitter<UserRequest> = new EventEmitter(); // ? Refresh List
  @Output() idUserDelete: EventEmitter<number> = new EventEmitter();
  @Output() refreshUserUpdate: EventEmitter<UserRequest> = new EventEmitter();

  dataForm?: CrudForm;
  formReadOnly: boolean = false;
  disableBtnAction: boolean = false;
  statesUser: string[] = Object.keys(StateUser).filter((key: any) => !isNaN(Number(StateUser[key])));
  rolesUser: string[] = Object.keys(Role).filter((key: any) => !isNaN(Number(Role[key])));
  formUser: FormGroup = this.FormBuilder.group({
    'id': ['0',],
    'username': ['', Validators.required],
    'password': ['', Validators.required],
    'firstname': ['',],
    'lastname': ['',],
    'state': ['',],
    'role': ['',],
  });
  //#endregion


  // * GETTERs and SETTERs
  //#region 
  get username() {
    return this.formUser.controls['username'];
  }

  get password() {
    return this.formUser.controls['password'];
  }

  get firstname() {
    return this.formUser.controls['firstname'];
  }

  get lastname() {
    return this.formUser.controls['lastname'];
  }

  get state() {
    return this.formUser.controls['state'];
  }

  get role() {
    return this.formUser.controls['role'];
  }
  //#endregion

  // * CONSTRUCTOR
  constructor(
    private FormBuilder: FormBuilder,
    private LoginService: LoginService,
    private AuthService: AuthService,
    private ToastService: ToastService
  ) { }

  ngOnInit(): void {
  }


  // * METHODs
  //#region 

  /**
   * Acciones del Formulario
   */
  formAction() {
    if (this.dataForm) {
      switch (this.dataForm.action) {
        case 0:
          //ADD : doy de alta un nuevo Usuario
          this.addUser();
          break;
        case 1:
          //UPDATE: modifico un Usuario 
          this.updateUser();
          break;
        case 2:
          //DELETE: elimino logicamente un Usuario
          //Lo termina de eliminar el modal de confirmacion de eliminacion
          this.deleteUser();
          break;
      }
    }
  }


  /**
   * Validacion de vista del formulario ADD, EDIT, DEL, READONLY
   * @param data 
   */
  loadFormUser(data: any) {
    this.dataForm = data;
    this.loadDataFormProduct();

    if (this.dataForm) {
      switch (this.dataForm.action) {
        case 0:
          //ADD : 
          this.formUser.enable();
          this.disableBtnAction = false;
          break;
        case 1:
          //UPDATE:  
          this.formUser.enable();
          this.disableBtnAction = false;
          break;
        case 2:
          //DELETE: 
          this.formUser.disable();
          this.disableBtnAction = true;
          break;
        case 3:
          //View ReadONly: Solo Lectura
          this.formUser.disable();
          this.disableBtnAction = true;
          break;
      }
    }


  }


  /**
  * Cargo el formulario con los datos del User
  */
  loadDataFormProduct() {
    this.formUser.patchValue({
      id: this.dataForm?.item?.id,
      username: this.dataForm?.item?.username,
      password: this.dataForm?.item?.password,
      firstname: this.dataForm?.item?.firstname,
      lastname: this.dataForm?.item?.lastname,
      state: this.dataForm?.item?.state,
      role: this.dataForm?.item?.role
    });
  }


  /**
   * Envio los datos del Usuario a agregar
   */
  addUser() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
    } else {
      let userRequest: UserRequest = {
        username: this.formUser.controls['username'].value,
        password: this.formUser.controls['password'].value,
        firstname: this.formUser.controls['firstname'].value,
        lastname: this.formUser.controls['lastname'].value,
        state: this.formUser.controls['state'].value,
        role: this.formUser.controls['role'].value
      } as UserRequest;
      console.log(userRequest);

      
      this.spinnerLoading();
      this.LoginService.svRegister(userRequest).subscribe({
        next: (response) => {
          this.AuthService.svDetailsUser(userRequest.username).subscribe({
            next: (detailsUser) => {
              this.refreshList(detailsUser);
            }
          })
          this.closeModal();
        }, error: (error) => {
          console.error(error);
        }
      })
    }
  }


  spinnerLoading(){
    this.ToastService.showOverlay = true;
    setTimeout(() => {
      this.ToastService.showOverlay = false;
    }, 1000);
  }

  /**
   * Envio los datos del usuario a modificar
   */
  updateUser() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
    } else {

      let userRequest: UserRequest = {
        id: this.dataForm?.item?.id,
        username: this.formUser.controls['username'].value,
        password: this.formUser.controls['password'].value,
        firstname: this.formUser.controls['firstname'].value,
        lastname: this.formUser.controls['lastname'].value,
        state: this.formUser.controls['state'].value,
        role: this.formUser.controls['role'].value,      
        img: this.dataForm?.item?.img
      } as UserRequest;

      this.spinnerLoading();
      this.AuthService.svUpdateUser(userRequest).subscribe({
        next: (response) => {
          //Refrescar Lista de Usuarios
          this.refreshUser(response);
          this.closeModal();
        }, error: (error) => {
          console.error(error);
        }
      })
    }
  }

  /**
   * Muestro modal de eliminacion de usuario
   */
  deleteUser() {
    const modal = document.getElementById('delete-modal-user');
    modal?.classList.remove('hidden');
  }


  /**
   * Cierra el Formulario de Producto (form Crud)
   */
  closeModal() {
    const modal = document.getElementById('crud-modal-user');
    this.formUser.reset();
    modal?.classList.add('hidden');
  }

  /**
   * Envio por el nuevo Usuario por Output para agregar a la lista de Usuarios que se encuentra 
   * en el dashboard-list-user.ts
   * 
   * @param usr usuario a dar de alta
   */
  refreshList(usr: UserRequest) {
    this.refreshListUsers.emit(usr);
  }

  /**
   * Envio por el nuevo Usuario por Output para modificar a la lista de Usuarios que se encuentra 
   * en el dashboard-list-user.ts
   * 
   * @param usr 
   */
  refreshUser(usr: UserRequest) {
    this.refreshUserUpdate.emit(usr);
  }

  /**
   * Envio por el nuevo Usuario por Output para eliminar a la lista de Usuarios que se encuentra 
   * en el dashboard-list-user.ts
   * 
   * @param idUsr 
   */
  eliminarUserList(idUsr: number) {
    this.idUserDelete.emit(idUsr);
  }
  //#endregion
}
