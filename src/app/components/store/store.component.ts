import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductRequest } from 'src/app/interfaces/productRequest';
import { Product } from 'src/app/models/product';
import { FilterCategoryProductPipe } from 'src/app/pipes/filter-category-product.pipe';
import { FilterNameProductPipe } from 'src/app/pipes/filter-name-product.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  // * ATRIBUTOS
  // ? Products
  products: Product[] | any;
  lenListProducts: number = 0;

  // ? Filters
  filterName: string = '';
  filterCategory: string = '';

  // ? Paginations
  cantElementPaginationDefult: number = 12;
  cantElementPagination: number = this.cantElementPaginationDefult;
  paginationView: number = 1;

  loading: boolean = true;

  // * CONSTRUCTOR
  constructor(
    private productServ: ProductService
  ) {
    if (this.productServ.listProducts?.length > 0) {
      this.products = this.productServ.listProducts;
      this.loading = false;
    } else {
      this.productServ.svListProducts().subscribe(
        (products) => {
          this.products = products;
          this.lenListProducts = this.products?.length;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      )
      this.productServ.listProducts = this.products;
    }
  }

  ngOnInit() {

  }


  // * METHODs
  //#region 

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
   * Limpia todos los filtros
   */
  clearFilters() {
    this.cantElementPagination = this.cantElementPaginationDefult;
    this.filterName = this.filterCategory = '';
    this.lenListProducts = this.products.length;
  }
  //#endregion
}
