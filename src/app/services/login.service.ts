import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../interfaces/loginRequest';
import { initFlowbite } from 'flowbite';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // * ATRIBUTOS
  _svCurrentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // ? boolean para verificar si hay una session activa
  _svCurretUserData: BehaviorSubject<String> = new BehaviorSubject<String>(""); // ? data del usuario login  (el token en si)

  // * GETTERs and SETTERs
  //#region 
  get userData(): Observable<String> {
    return this._svCurretUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this._svCurrentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this._svCurretUserData.value;
  }
  //#endregion

  // * CONSTRUCTOR
  constructor(
    private http: HttpClient,
    private AuthService: AuthService,
    private router: Router,
    private ToastService: ToastService
  ) {
    this._svCurrentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this._svCurretUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");    
  }

  // * METHODs
  //#region 
  /**
   * Metodo Login de usuarios
   * @param credentials 
   * @returns 
   */
  public svLogin(credentials: LoginRequest): Observable<User> {
    return this.http.post<any>(environment.urlApiAuth + "login", credentials).pipe(
      tap((userData) => {     
        localStorage.setItem('userLogin', credentials.username);                
        sessionStorage.setItem("token", userData.token);
        this._svCurretUserData.next(userData.token);
        this._svCurrentUserLoginOn.next(true);  
        this.ToastService.Info('¡Bienvenido '+ credentials.username + '!');              
      }),
      map((userData) => userData.token),
      catchError(this.svHandleError)
    )
  }

  /**
   * Metodo Logout de usuarios
   */
  public svLogout(): void {
    this._svCurrentUserLoginOn.next(false);
    this._svCurretUserData.next("");
    this.ToastService.Info(' 👋¡Hasta pronto '+ this.AuthService?.userData?.username + '!');         
    this.clearLocalStorage();
  }


  private clearLocalStorage():void{
    sessionStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userData');
    localStorage.removeItem('idUser');
    this.AuthService.userData = null;
  }

  /**
   * Metodo de Registro para Usuarios
   * @param credentials informacion del usuario
   * @returns 
   */
  public svRegister(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(environment.urlApiAuth + "register", credentials as LoginRequest).pipe(
      tap(() => {
        this.ToastService.Success('¡Usuario dado de alta exitosamente.!')
      }),
      catchError( (error) => {
        this.ToastService.Error('¡Ups!. No se pudo registrar el Usuario. ☹️');
        return throwError(() => new Error(error));
      })
    );
  }

  /**
   * Manejador de error
   * @param error 
   * @returns 
   */
  private svHandleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Se a producido un error, " + error);
    } else {
      // console.error("Backend error. Status: " + error.status + error.error);
    }
    return throwError(() => new Error('Algo fallo. Intentelo nuevamente'));
  }

  /**
   * Método para verificar si el token está vencido en tiempo real
   */
  public checkTokenExpiration(): void {
    const token = this._svCurretUserData.value;

    if (token) {
      const decodedToken: any = jwtDecode(token as string);
      const expirationDate: Date = new Date(decodedToken.exp * 1000); // ? SET EXPIRACION DE TOKEN A 30min.

      if (expirationDate < new Date()) {
        // Token expirado, desloguear al usuario
        this.svLogout();
        this.router.navigateByUrl('home');
      }else{        
        if(this.AuthService.userData == undefined){
          this.AuthService.svDetailsUser(localStorage.getItem('userLogin') as string).subscribe();
        }
      }
    }
  }
  //#endregion
}
