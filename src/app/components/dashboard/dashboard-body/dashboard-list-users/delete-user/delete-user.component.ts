import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Storage, deleteObject, ref, uploadBytes } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  // * ATRIBUTOS
  @Input() idUser?: number; // ? Id del User a Eliminar
  @Output() idUserDelete: EventEmitter<number> = new EventEmitter();

  // * CONSTRUCTOR
  constructor(
    private AuthService: AuthService,
    private ToastService : ToastService,
    private Storage: Storage
  ){}
  
  ngOnInit(): void {}

  // * METHODs
    //#region 

  /**
   * Elimino el producto de la BD y envio el ID del producto eliminiado al al componente 
   * padre para que lo elimine del listado en dashboard-product
   */
  deleteUser() {
    if (this.idUser) {
    this.spinnerLoading();

    this.AuthService.svDetailsUserID(this.idUser).subscribe(
      res =>{
        if(res.img){
          const imgRef = ref(this.Storage, res.img);
          deleteObject(imgRef);
        }

        this.AuthService.svDeleteUser(this.idUser).subscribe();
        this.idUserDelete.emit(this.idUser);
        this.closeModal();
      }
    )     
    } else {
      console.error("Error. No se puede eliminar un Usuario con valor de id es: " + this.idUser);
    }
  }

  spinnerLoading(){
    this.ToastService.showOverlay = true;
    setTimeout(() => {
      this.ToastService.showOverlay = false;
    }, 1000);
  }

  /**
   * Cierro el Modal de la question delete y el formulario Crud de producto
   */
  closeModal() {
    const modalDeleteProduct = document.getElementById('delete-modal-user');
    const modalCrudProduct = document.getElementById('crud-modal-user');

    modalDeleteProduct?.classList.add('hidden');
    modalCrudProduct?.classList.add('hidden');
  }
    //#endregion

}
