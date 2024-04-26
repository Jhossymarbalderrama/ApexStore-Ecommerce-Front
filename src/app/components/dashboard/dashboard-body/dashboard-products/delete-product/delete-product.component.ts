import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit{

  // * ATRIBUTOS
  @Input() idProduct?: number; // ? Id del Producto a Eliminar
  @Output() idProductDelete: EventEmitter<number> = new EventEmitter();

  // * CONSTRUCTOR
  constructor(
    private ProductService: ProductService,
    private ToastService: ToastService
  ){}

  ngOnInit(): void {}


  // * METHODs
  //#region 

  /**
   * Elimino el producto de la BD y envio el ID del producto eliminiado al al componente 
   * padre para que lo elimine del listado en dashboard-product
   */
  deleteProduct(){
    if(this.idProduct){
      this.ToastService.showOverlay = true;
      this.ProductService.svDeleteProduct(this.idProduct).subscribe(
        ()=>{
          setTimeout(() => {
            this.idProductDelete.emit(this.idProduct);
            this.ToastService.showOverlay = false;
            this.closeModal();
          }, 1000);
        }
      );      
    }else{
      console.error("Error. No se puede eliminar un Producto con valor de id es: "+this.idProduct);     
      this.ToastService.showOverlay = false; 
    }
  }


  /**
   * Cierro el Modal de la question delete y el formulario Crud de producto
   */
  closeModal() {
    const modalDeleteProduct  = document.getElementById('delete-modal-product');    
    const modalCrudProduct = document.getElementById('crud-modal-product');
    
    modalDeleteProduct?.classList.add('hidden');
    modalCrudProduct?.classList.add('hidden');
  }
  //#endregion




}
