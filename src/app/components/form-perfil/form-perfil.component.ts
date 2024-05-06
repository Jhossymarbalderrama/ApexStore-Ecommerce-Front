import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/interfaces/userRequest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

import { Storage, ref, uploadBytes, deleteObject } from '@angular/fire/storage';
import { getDownloadURL, getStorage } from '@firebase/storage';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  // * ATRIBUTOS
  @Output() refreshData = new EventEmitter<boolean>();

  public imgLocal: any = []; // ? url de la imagen para ver local antes de hacer el upload
  public imgUp: any = []; // ? img para subir, hacer el upload

  formPerfil: FormGroup = this.FormBuilder.group({
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'img': ['',]
  })

  // * GETTERs and SETTERs
  get firstname() {
    return this.formPerfil.controls['firstname'];
  }

  get lastname() {
    return this.formPerfil.controls['lastname'];
  }

  get img() {
    return this.formPerfil.controls['img'];
  }

  // * CONSTRUCTOR
  constructor(
    private FormBuilder: FormBuilder,
    private LoginService: LoginService,
    public AuthService: AuthService,
    private ToastService: ToastService,
    private Storage: Storage,
    public UrlService: UrlService
  ) { }

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.setValuesForm();
    }, 500);
  }

  // * METHODs
  //#region 

  /**
   * Cierre de Modal
   */
  closeModal() {
    const modal = document.getElementById('crud-modal');
    this.formPerfil.reset();
   this.setValuesForm();
    modal?.classList.add('hidden');
  }


  setValuesForm(){
    this.formPerfil.patchValue({
      'firstname': this.AuthService.userData?.firstname,
      'lastname': this.AuthService.userData?.lastname,
      'img': this.AuthService.userData?.img
    });
  }

  /**
   * Envio usuario modificado
   */
  updateDataUser() {
    if (this.formPerfil.valid) {
      this.ToastService.showOverlay = true;
      // ? Armo el objeto User para la request de update
      let userRequest: UserRequest = {
        username: this.AuthService.userData?.username,
        password: this.AuthService.userData?.password,
        id: this.AuthService.userData?.id,
        firstname: this.formPerfil.get('firstname')?.value,
        lastname: this.formPerfil.get('lastname')?.value,
        state: this.AuthService.userData?.state,
        role: this.AuthService.userData?.role,
        img: this.AuthService.userData?.img
      }
      
      if (this.imgLocal[0]) {

        // ? Si tiene una img el usuario, elimino primero antes de subir la nueva imagen
        if(this.AuthService.userData?.img){
          const imgRef = ref(this.Storage, this.AuthService.userData?.img);
          deleteObject(imgRef);
        }

        // ? Subo la img nueva a firebase
        const uploadImgToFireStore = async () => {
          const imgRef = ref(this.Storage, `images/profiles/${this.imgUp[0].name}`);
          try {
            await uploadBytes(imgRef, this.imgUp[0]);
            const imgURL = await getDownloadURL(imgRef);
            userRequest.img = imgURL;
          } catch (error) {
            console.error(error);
          }
        };
        
        uploadImgToFireStore().then(() => {
          // ? UPDATE subiendo img nueva
          this.AuthService.svUpdateUser(userRequest).subscribe();
        });        
      }else{
         // ? Update Normal 
          this.AuthService.svUpdateUser(userRequest).subscribe();
      }
      
      setTimeout(() => {
        this.ToastService.showOverlay = false;
        this.refreshData.emit(true);
        this.closeModal();
      }, 2000);
    } else {
      this.formPerfil.markAllAsTouched();
    }

  }


  onSaveFileLocal(event: any): void {
    this.imgUp = [];//Lista para service db
    this.imgLocal = [];//Lista para ver 

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    for (const f of event.target.files) {
      const modifiedFileName = `img_${year}${month}${day}_${hours}${minutes}${seconds}_${f.name}`;

      this.imgUp.push(new File([f], modifiedFileName, { type: f.type }));
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.imgUp[0]);
    reader.onload = (data: any) => {
      this.imgLocal.push(data.target.result);
    }

  }
  //#endregion

}
