import { Component, ViewChild } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { LoginService } from 'src/app/services/login.service';
import { Factura_State } from 'src/app/enums/Factura_State';
import { FilterNameFacturasPipe } from 'src/app/pipes/filter-name-facturas.pipe';
import { FilterDireccionFacturasPipe } from 'src/app/pipes/filter-direccion-facturas.pipe';
import { FilterTotalFacturasPipe } from 'src/app/pipes/filter-total-facturas.pipe';
import { Crud } from 'src/app/enums/Crud';
import { CrudForm } from 'src/app/interfaces/crudForm';
import { FormShopHistoryComponent } from '../dashboard-shopping-history/form-shop-history/form-shop-history.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent {
  @ViewChild('modalDetailFactura') modalDetailFactura?: FormShopHistoryComponent;

  public listFacturas!: Factura[];
  public state: string = Factura_State[Factura_State.PENDIENTE];
  public Factura_State!: Factura_State;
  action: Crud | any;
  dataCrud?: CrudForm;

  lenListFacturas: number = 0;
  // ? Filters
  filterName: string = '';
  filterDireccion: string = '';
  filterTotalPagado: string = '';

  // ? Paginations
  cantElementPaginationDefult: number = 10;
  cantElementPagination: number = this.cantElementPaginationDefult;
  paginationView: number = 1;


  // * CONSTRUCTOR
  constructor(
    private FacturacionService: FacturacionService
  ) {
    this.action = Crud;
    this.loadListFacturas();
  }


  sendDataModal(data: any) {
    this.modalDetailFactura?.loadFormModal(data);
  }

  showModal(action: Crud, item: any) {
    const modal = document.getElementById('modal-datail-factura');
    modal?.classList.remove('hidden');

    this.dataCrud = {
      action: action,
      item: item
    }

    this.sendDataModal(this.dataCrud);
  }


  refreshListFacturas(data: any) {
    data ? this.loadListFacturas() : data;
  }

  loadListFacturas() {
    this.FacturacionService.svListFacturas().subscribe(data => {
      this.listFacturas = data;
    })
  }

  /**
   * Método para obtener los elementos de la página actual
   * @returns lista de productos filtrados y paginados
   */
  obtenerElementosDePagina(): any[] {
    let elementosFiltrados = new FilterNameFacturasPipe()
      .transform(this.listFacturas, this.filterName)
      ?.filter(
        ft => new FilterDireccionFacturasPipe()
          .transform([ft], this.filterDireccion).length > 0)
      ?.filter(
        ft => new FilterTotalFacturasPipe()
          .transform([ft], this.filterTotalPagado).length > 0);

    this.lenListFacturas = elementosFiltrados?.length;
    if (this.paginationView !== this.obtenerRangoDePaginas().length) {
      this.cambiarPagina(this.lenListFacturas - 1);
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
    let totalPaginas = Math.ceil(this.lenListFacturas / this.cantElementPagination);
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
    this.filterName = '';
    this.filterDireccion = '';
    this.filterTotalPagado = '';
  }
}
