import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private http: HttpClient
  ) { }


  listTotalIngresosXMes(): Observable<any> {
    return this.http.get<any>(environment.urlApiChart + "listTotalIngresosXMes");
  }

  listTop5ProductosMasVendidos() : Observable<any>{
    return this.http.get<any>(environment.urlApiChart + "listTop5ProductosVendidos");
  }  

  listCantUserXRole() : Observable<any>{
    return this.http.get<any>(environment.urlApiChart + "listCantUserXRole");
  }


  listCantidadDeFacturasMes(): Observable<any> {
    return this.http.get<any>(environment.urlApiChart + "listCantidadDeFacturasMes");
  }

  listAltaProductosXMes() : Observable<any>{
    return this.http.get<any>(environment.urlApiChart + "listAltaProductosXMes");
  }
}
