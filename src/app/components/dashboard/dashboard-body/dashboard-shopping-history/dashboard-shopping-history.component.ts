import { Component, ViewChild } from '@angular/core';
import { Crud } from 'src/app/enums/Crud';
import { Factura_State } from 'src/app/enums/Factura_State';
import { Factura } from 'src/app/models/factura';
import { AuthService } from 'src/app/services/auth.service';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { LoginService } from 'src/app/services/login.service';
import { FormShopHistoryComponent } from './form-shop-history/form-shop-history.component';
import { CrudForm } from 'src/app/interfaces/crudForm';
import { FilterNameFacturasPipe } from 'src/app/pipes/filter-name-facturas.pipe';
import { FilterDireccionFacturasPipe } from 'src/app/pipes/filter-direccion-facturas.pipe';

@Component({
  selector: 'app-dashboard-shopping-history',
  templateUrl: './dashboard-shopping-history.component.html',
  styleUrls: ['./dashboard-shopping-history.component.css']
})
export class DashboardShoppingHistoryComponent {

  // * ATRIBUTOS
  public listFacturas: Factura[] = [];
  public tieneFacturas: boolean = true;
  public state: string = Factura_State[Factura_State.PENDIENTE];
  public Factura_State!: Factura_State;
  action: Crud | any;
  dataCrud?: CrudForm;

  @ViewChild('modalDetailFactura') modalDetailFactura?: FormShopHistoryComponent;

  lenListFacturas: number = 0;

  // ? Filters
  filterName: string = '';
  filterDireccion: string = '';
  filterTotal: number = 0;

  // ? Paginations
  cantElementPaginationDefult: number = 10;
  cantElementPagination: number = this.cantElementPaginationDefult;
  paginationView: number = 1;

  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService,
    private FacturacionService: FacturacionService,
    private AuthService: AuthService
  ) {
    this.loadListFacturas();
    this.action = Crud;
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
    this.AuthService.svDetailsUser(localStorage.getItem('userLogin') as string).subscribe(
      (user) => {
        this.FacturacionService.svListFacturasUser(user.id).subscribe(data => {
          this.listFacturas = data;
          if (data.length != 0) {
            this.tieneFacturas = true;
          }else{
            this.tieneFacturas = false;
          }
        });
      }
    );
  }

  /**
   * Método para obtener los elementos de la página actual
   * @returns lista de productos filtrados y paginados
   */
  obtenerElementosDePagina(): any[] {
    let elementosFiltrados = new FilterDireccionFacturasPipe()
      .transform(this.listFacturas, this.filterDireccion);

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
  }
}


