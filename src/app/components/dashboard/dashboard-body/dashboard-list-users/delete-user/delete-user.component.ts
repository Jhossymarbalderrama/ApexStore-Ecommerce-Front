import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    private AuthService: AuthService
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
      this.AuthService.svDeleteUser(this.idUser).subscribe();
      this.idUserDelete.emit(this.idUser);
      this.closeModal();
    } else {
      console.error("Error. No se puede eliminar un Usuario con valor de id es: " + this.idUser);
    }
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
