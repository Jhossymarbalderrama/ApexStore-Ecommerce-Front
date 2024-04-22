import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  // * CONSTRUCTOR
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private ToastService: ToastService,
    private AuthService: AuthService
  ) { }

  // * METHODs
  //#region 
 /**
  * Alta de facturacion
  * @param facturaData  informacion de la factura
  * @param listProduct  array con id de los productos de la factura
  * @param message mensaje
  * @returns 
  */
  svAltaFacturacion(facturaData: any, listProduct: number[]) {
    const requestData = {
      facturaData: facturaData,
      listProduct: listProduct
    };

    return this.http.post<any>(environment.urlApiFacturacion + "add", requestData).pipe(
      tap((res) => {
        // console.info("Facturacion de: ", res);
        this.ToastService.Success('¡Su pedido fue enviado exitosamente!. Muchas gracias 😀');
      }),
      catchError((error: any) => {
          this.ToastService.Error('No pudimos procesar su petición. ☹️');
          return throwError( () => new Error(error));
        }
      )
    )
  }

  svCancelFactura(facturaData: any): Observable<any>{
    return this.http.post<any>(environment.urlApiFacturacion + "cancel", facturaData).pipe(
      tap( (res) => {    
        this.ToastService.Info('¡Su pedido ha sido cancelado!.');
      }),
      catchError((error: any) => {
          this.ToastService.Error('No pudimos procesar su petición. ☹️');
          return throwError( () => new Error(error));
        }
      )
    )
  }

  svUpdateFactura(facturaData: any) : Observable<any>{
    return this.http.put<any>(environment.urlApiFacturacion + "update", facturaData).pipe(
      tap( (res) => {    
        this.ToastService.Info('¡Cambio de estado exitoso!.');
      }),
      catchError((error: any) => {
          this.ToastService.Error('No pudimos procesar su petición. ☹️');
          return throwError( () => new Error(error));
        }
      )
    )
  }

  /**
   * Obtengo la lista de todas las facturas emitidas
   * @returns 
   */
  svListFacturas(): Observable<any>{
    return this.http.get<any>(environment.urlApiFacturacion + "list").pipe(
      tap( (res) => {
        // console.log(res);        
      }),
      catchError((error: any) => {
        return throwError( () => new Error());
      })
    )
  }


  svListFacturasUser(id: number):Observable<any>{

      return this.http.get<any>(environment.urlApiFacturacion + "list/"+ id).pipe(
        tap((res) => {
   
        }),
        catchError((error: any) => {
          return throwError( () => new Error());
        })
      )
  }
  //#endregion
}
