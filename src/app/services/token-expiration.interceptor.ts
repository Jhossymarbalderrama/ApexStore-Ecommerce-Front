import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {

  // * CONSTRUCTOR
  constructor(private LoginService: LoginService) {}

  // * METHODs
  /**
   * Varificacion Si el token del usuario expiro
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verificar la expiración del token antes de cada solicitud
    // this.LoginService.checkTokenExpiration();

    // Continuar con la solicitud
    return next.handle(request);
  }
}