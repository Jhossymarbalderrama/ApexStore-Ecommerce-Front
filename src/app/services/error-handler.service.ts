import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  // * METHODs
  /** Manejador de Errores
   * 
   * @param operation 
   * @param result 
   * @returns 
   */
  handleError<T>(operation = "operation", result?: T){
    return (error: any) : Observable<T> =>{
      // console.log(`${operation} faild: ${error.message}`);
      return of(result as T);
    }
  }  
}
