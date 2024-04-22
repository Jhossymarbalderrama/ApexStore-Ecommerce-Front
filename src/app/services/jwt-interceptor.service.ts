import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  // * CONSTRUCTOR
  //AGREGAR EN PROVIDERS CADA INTERCEPTOR CREADO (APP.MODULE -> PRIVIDER)
  constructor(
    private loginService: LoginService
  ) {

  }

  // * METHODs
  /**
   * Agrega el token en el header de la peticion para la autorizacion
   * 
   * @param req 
   * @param next 
   * @returns 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: String = this.loginService.userToken;

    if (token != "") {
      req = req.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      )
    }

    return next.handle(req);
  }
}
