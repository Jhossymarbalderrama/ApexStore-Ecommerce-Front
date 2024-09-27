import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, pipe, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './auth.service';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { ProductRequest } from '../interfaces/productRequest';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // * ATRIBUTOS
  private _svListProduct: Product[] = []; // ? Listado de productos de la BD local

  // * CONSTRUCTOR
  constructor(
    private http: HttpClient,
    private authServ: AuthService,
    private errorHandlerServ: ErrorHandlerService,
    private loginService: LoginService,
    private ToastService: ToastService
  ) { }

  // * GETTERs and SETTERs
  //#region 
  get listProducts(): Product[] {
    return this._svListProduct;
  }

  set listProducts(pd: Product[]) {
    this._svListProduct = pd;
  }
  //#endregion

  // * METHODs
  //#region 

  /**
   * Agregar un nuevo producto
   * @param pd informacion del producto
   * @returns 
   */
  svAddProduct(pd: ProductRequest): Observable<any> {
    return this.http.post<any>(environment.urlApiProduct + "add", pd).pipe(
      tap(() => {
        this.ToastService.Success('¡Producto agregado con exito.!');
      }),
      catchError((error) => {
        this.ToastService.Error('¡Ups.! No se pudo agregar el producto.');
        this.errorHandlerServ.handleError<Product>("Error. Add Product: " + pd);
        return throwError(() => new Error(error));
      }
      )
    );
  }

  /**
   * Modificacion del producto
   * @param pd informacion del producto a modificar
   * @returns 
   */
  svUpdateProduct(pd: ProductRequest): Observable<any> {
    console.log("Servicio Productos", "Update:" + pd);

    return this.http.put<any>(environment.urlApiProduct + "update", pd).pipe(
      tap(() => {
        this.ToastService.Success('¡Producto modificado con exito.!');
      }),
      catchError((error) => {
        this.ToastService.Error('¡Ups.! No se pudo modificar el producto.');
        this.errorHandlerServ.handleError<Product>("Error. Update Product: " + pd);
        return throwError(() => new Error(error));
      }
      )
    )
  }

  /**
   * @param id 
   *  Eliminacion del producto // ? Deberia cambiarse para Baja Logica
   * @returns 
   */
  svDeleteProduct(id?: number): Observable<any> {
    return this.http.delete<any>(environment.urlApiProduct + "delete/" + id).pipe(
      tap(() => {
        this.ToastService.Success('¡Producto eliminado con exito.!');
      }),
      catchError((error) => {
        this.ToastService.Error('¡Ups.! No se pudo eliminar el producto.');
        this.errorHandlerServ.handleError<Product>("Error. Delete Product with ID: " + id)        
        return throwError(() => new Error(error));
      }
      )
    )
  }

  /**
   * Traer informacion de un producto
   * @returns 
   */
  svProductDetails(id: number): Observable<Product> {
    //...
    return this.http.get<Product>(environment.urlApiProduct+"get/"+id);
  }

  /**
   * Obtengo el listado de Productos
   * @returns Observable List Product[]
   */
  svListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.urlApiProduct + "list")
      .pipe(
        tap((productsList) => {          
          this.svSaveListLocal(productsList);
        }),
        catchError(
          this.errorHandlerServ.handleError<Product[]>("getListProducts", [])
        )
      )
  }

  /**
   * Guardo Productos que se encuentran en el carrito en el localstorage
   * @param pds 
   */
  private svSaveListLocal(pds: Product[]): void {
    this._svListProduct = pds;
  }
  //#endregion
}
