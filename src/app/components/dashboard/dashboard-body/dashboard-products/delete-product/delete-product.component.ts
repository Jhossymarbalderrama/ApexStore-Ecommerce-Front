import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { Storage, deleteObject, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  // * ATRIBUTOS
  @Input() idProduct?: number; // ? Id del Producto a Eliminar
  @Output() idProductDelete: EventEmitter<number> = new EventEmitter();

  // * CONSTRUCTOR
  constructor(
    private ProductService: ProductService,
    private ToastService: ToastService,
    private Storage: Storage
  ) { }

  ngOnInit(): void { }


  // * METHODs
  //#region 

  /**
   * Elimino el producto de la BD y envio el ID del producto eliminiado al al componente 
   * padre para que lo elimine del listado en dashboard-product
   */
  deleteProduct() {
    if (this.idProduct) {
      this.ToastService.showOverlay = true;

      this.ProductService.svProductDetails(this.idProduct).subscribe(
        data => {
          // Elimino las imagenes del storage
          if(data.img){
            data.img.forEach(url => {
              const imgRef = ref(this.Storage, url);
  
              deleteObject(imgRef);
            });
          }

          //Elimino el producto
          this.ProductService.svDeleteProduct(this.idProduct).subscribe(
            () => {
              setTimeout(() => {
                this.idProductDelete.emit(this.idProduct);
                this.ToastService.showOverlay = false;
                this.closeModal();
              }, 1000);
            }
          );
        }
      );

    } else {
      console.error("Error. No se puede eliminar un Producto con valor de id es: " + this.idProduct);
      this.ToastService.showOverlay = false;
    }
  }


  /**
   * Cierro el Modal de la question delete y el formulario Crud de producto
   */
  closeModal() {
    const modalDeleteProduct = document.getElementById('delete-modal-product');
    const modalCrudProduct = document.getElementById('crud-modal-product');

    modalDeleteProduct?.classList.add('hidden');
    modalCrudProduct?.classList.add('hidden');
  }
  //#endregion




}
