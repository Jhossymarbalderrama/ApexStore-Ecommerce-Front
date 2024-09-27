import { Component, OnInit, ViewChild } from '@angular/core';
import { Crud } from 'src/app/enums/Crud';
import { CrudForm } from 'src/app/interfaces/crudForm';
import { UserRequest } from 'src/app/interfaces/userRequest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormUserComponent } from './form-user/form-user.component';
import { LoginService } from 'src/app/services/login.service';
import { FilterMailUserPipe } from 'src/app/pipes/filter-mail-user.pipe';

@Component({
  selector: 'app-dashboard-list-users',
  templateUrl: './dashboard-list-users.component.html',
  styleUrls: ['./dashboard-list-users.component.css']
})
export class DashboardListUsersComponent implements OnInit {

  // * ATRIBUTOS
  @ViewChild('crudFormUser') crudFormUser?: FormUserComponent;

  userList: User[] | any = [];
  action: Crud | any;
  dataFormUser?: CrudForm;

  lenListUsers: number = 0;

  // ? Filters
  filterEmail: string = '';

  // ? Paginations
  cantElementPaginationDefult: number = 10;
  cantElementPagination: number = this.cantElementPaginationDefult;
  paginationView: number = 1;

  // * CONSTRUCTOR
  constructor(
    private AuthService: AuthService
  ) {
    // this.LoginService.checkTokenExpiration();
    this.AuthService.svListUsers().subscribe(
      (users) => {
        this.userList = users;
        console.log(users);
        
      }
    )

    this.action = Crud;
  }

  ngOnInit(): void { }

  // * METHODs
  //#region 

  /***
   * LLamo a la funcion de carda del formulario
   */
  callFormUserComponent(data: any) {
    if (this.crudFormUser) {
      this.crudFormUser.loadFormUser(data);
    }
  }

  /**
  * Muestro en un Modal el formulario de Producto, con los datos del producto.
  * ALTA-MODIFICACION-DELETE
  * 
  * @param action [0: Add,1: Update,2: Delete]
  * @param product [Producto]
  */
  showModal(action: Crud, user?: User | UserRequest) {
    const modal = document.getElementById('crud-modal-user');
    modal?.classList.remove('hidden');

    this.dataFormUser = {
      action: action,
      item: user
    }

    this.callFormUserComponent(this.dataFormUser);
  }

  /**
   * Agrego el Producto dado de alta al listado
   * 
   * @param data informacion del Producto CRUD del formulario formProduct en form-product.component.ts
   */
  refreshList(usr: UserRequest) {
    this.userList.push(usr);
  }

  /**
   * actualizo el producto del listado 
   * 
   * @param product Producto ya modificado
   */
  refreshUserUpdate(usr: UserRequest) {
    this.eliminarUserList(usr.id as number);
    this.refreshList(usr);
  }

  /**
   *  Eliminacion del producto en el listado
   * 
   * @param idProduct id del producto que se eliminara del listado
   */
  eliminarUserList(idUsr: number) {
    this.userList = this.userList.filter((a: any) => a.id != idUsr);
  }

  /**
   * Método para obtener los elementos de la página actual
   * @returns lista de productos filtrados y paginados
   */
  obtenerElementosDePagina(): any[] {
    let elementosFiltrados = new FilterMailUserPipe()
      .transform(this.userList, this.filterEmail);

    this.lenListUsers = elementosFiltrados?.length;
    if (this.paginationView !== this.obtenerRangoDePaginas().length) {
      this.cambiarPagina(this.lenListUsers - 1);
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
    let totalPaginas = Math.ceil(this.lenListUsers / this.cantElementPagination);
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
    this.filterEmail = '';
  }
  //#endregion
}
