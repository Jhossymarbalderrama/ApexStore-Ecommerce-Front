import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService  implements HttpInterceptor{

  // * CONSTRUCTOR
  //AGREGAR EN PROVIDERS CADA INTERCEPTOR CREADO (APP.MODULE -> PRIVIDER)
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError (error =>{
        // console.error(error);
        return throwError(() => error);
      })  
    );
  }
}
