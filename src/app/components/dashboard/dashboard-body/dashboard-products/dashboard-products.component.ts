import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Crud } from 'src/app/enums/Crud';
import { CrudForm } from 'src/app/interfaces/crudForm';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormProductComponent } from './form-product/form-product.component';
import { ProductRequest } from 'src/app/interfaces/productRequest';
import { FilterNameProductPipe } from 'src/app/pipes/filter-name-product.pipe';
import { FilterCategoryProductPipe } from 'src/app/pipes/filter-category-product.pipe';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css']
})
export class DashboardProductsComponent implements OnInit {

  // * ATRIBUTOS
  //#region 
  @ViewChild('crudFormProduct') crudFormProduct?: FormProductComponent;
  // ? Products
  dataFormProduct?: CrudForm;
  products: Product[] | any;
  action: Crud | any;
  lenListProducts: number = 0;

  // ? Filters
  filterName: string = '';
  filterCategory: string = '';

  // ? Paginations
  cantElementPaginationDefult: number = 10;
  cantElementPagination: number = this.cantElementPaginationDefult;
  paginationView: number = 1;
  //#endregion

  // * CONSTRUCTOR
  constructor(
    private ProductService: ProductService
  ) {
    this.action = Crud;
  }

  ngOnInit(): void {
    this.ProductService.svListProducts().subscribe(
      (data) => {
        this.products = data;
        this.lenListProducts = this.products?.data;
      }
    );
  };

  // * METHODs
  //#region 

  /***
   * LLamo a la funcion de carda del formulario
   */
  callFormProductComponent(data: any) {
    if (this.crudFormProduct) {
      this.crudFormProduct.loadFormProduct(data);
    }
  }

  /**
   * Muestro en un Modal el formulario de Producto, con los datos del producto.
   * ALTA-MODIFICACION-DELETE
   * 
   * @param action [0: Add,1: Update,2: Delete]
   * @param product [Producto]
   */
  showModal(action: Crud, product?: Product | ProductRequest) {
    const modal = document.getElementById('crud-modal-product');
    modal?.classList.remove('hidden');

    /*
     let fecha: any = this.dataForm.item.discharge_date.split('/');
     this.dataForm.item.discharge_date = fecha[2] + '-' + fecha[1] + '-' + fecha[0];
    */     

    this.dataFormProduct = {
      action: action,
      item: product
    }

    this.callFormProductComponent(this.dataFormProduct);
  }

  /**
   * Agrego el Producto dado de alta al listado
   * 
   * @param data informacion del Producto CRUD del formulario formProduct en form-product.component.ts
   */
  refreshList(product: ProductRequest) {
    this.products.push(product);
  }

  /**
   * actualizo el producto del listado 
   * 
   * @param product Producto ya modificado
   */
  refreshProductUpdate(product: ProductRequest) {
    this.eliminarProductList(product.id as number);
    this.refreshList(product);
  }

  /**
   *  Eliminacion del producto en el listado
   * 
   * @param idProduct id del producto que se eliminara del listado
   */
  eliminarProductList(idProduct: number) {
    this.products = this.products.filter((a: any) => a.id != idProduct);
  }

  /**
   * Método para obtener los elementos de la página actual
   * @returns lista de productos filtrados y paginados
   */
  obtenerElementosDePagina(): any[] {
    let elementosFiltrados = new FilterNameProductPipe()
      .transform(this.products, this.filterName)
      ?.filter(
        pd => new FilterCategoryProductPipe()
          .transform([pd], this.filterCategory).length > 0);


    this.lenListProducts = elementosFiltrados?.length;
    if (this.paginationView !== this.obtenerRangoDePaginas().length) {
      this.cambiarPagina(this.lenListProducts - 1);
    }

    let indiceInicio = (this.paginationView - 1) * this.cantElementPagination;
    let indiceFin = indiceInicio + this.cantElementPagination;

    return elementosFiltrados?.slice(indiceInicio, indiceFin);
  }

  /**
   * Método para obtener el rango de páginas
   * @returns 
   */
  obtenerRangoDePaginas(): number[] {
    let totalPaginas = Math.ceil(this.lenListProducts / this.cantElementPagination);
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  /**
   * Método para cambiar la página
   * @param nuevaPagina 
   */
  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.obtenerRangoDePaginas().length) {
      this.paginationView = nuevaPagina;
    }
  }

  /**
   * Limpio los atributos
   */
  clearFilters() {
    this.cantElementPagination = this.cantElementPaginationDefult;
    this.filterName = this.filterCategory = '';
    this.lenListProducts = this.products?.length;
  }

  //#endregion
}
