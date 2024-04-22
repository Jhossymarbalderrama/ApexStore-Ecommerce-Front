import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  // * CONSTRUCTOR
  constructor(
    private http: HttpClient
  ) { }

  // * METHODs
  /**
   * 
   * @returns Obtengo el listado de deliverys (Metodos de envio)
   */
  svGetListDelivery(): Observable<any> {
    return this.http.get<any>(environment.urlApiDelivery + "list").pipe();
  }

}
