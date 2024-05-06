import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../interfaces/userRequest';
import { ToastService } from './toast.service';
import { Role } from '../enums/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  // * ATRIBUTOS
  private svUserData?: User; // ? Datos del Usuario Logeado
  public svADM?: boolean = false;
  // * CONSTRUCTOR
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private ToastService:ToastService
  ) {
  }

  // * GETTERs
  get userData(): User | any {
    return this.svUserData;
  }

  set userData(userdata: any){
    this.svUserData = userdata;
  }

  // * METHODs
  //#region 
  /**
   * Obtengo los datos del usuario logeado
   */
  svGetUserData() {
    this.svDetailsUser(localStorage.getItem('userLogin') as string).subscribe();
  }

  /**
   * Agrega un Usuario 
   * @returns 
  */
  // ? Para dar de alta utilizo el sevicio de Login
  svAddUser(): Observable<User> {
    return new Observable<any>();
  }


  /**
   * Modificacion de datos de Usuario
   * @param credentials credenciales para el login
   * @returns 
   */
  svUpdateUser(credentials: UserRequest): Observable<User> {
    return this.http.put<any>(environment.urlApiUser + "update", credentials).pipe(
      tap((response) => {        
        this.ToastService.Success('¡Datos de usuario actualizados!.');
      }),
      catchError(this.errorHandlerService.handleError<any>())
    )
  }


  /**
   * Eliminacion de Usuario
   * @param id id del usuario a eliminar
   * @returns 
   */
  svDeleteUser(id?: number): Observable<any> {
    // logic delete...
    return this.http.delete<any>(environment.urlApiUser + 'delete/' + id).pipe(
      tap( () => {
        this.ToastService.Info('¡Usuario eliminado exitosamente!.');
      }),
      catchError(this.errorHandlerService.handleError<any>())
    )
  }


  /**
   * Obtengo informacion del usuario pasado por parametro (usrName: Nombre del usuario)
   * @param usrName nombre del usuario a buscar
   * @returns 
   */
  svDetailsUser(usrName: string): Observable<User> {
    return this.http.get<User>(environment.urlApiUser + "get/detail/" + usrName).pipe(
      tap((response) => {
        this.userData = response;
        if(response.role == Role[0]){
          this.svADM = true;
        } else{
          this.svADM = false;
        }
      }),
      catchError(this.errorHandlerService.handleError<any>())
    );
  }


  /**
   * Listo todos los usuarios
   * @returns 
   */
  svListUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.urlApiUser + "list").pipe(
      catchError(this.errorHandlerService.handleError<any>())
    );
  }


  svDetailsUserID(id: number): Observable<User>{
    return this.http.get<User>(environment.urlApiUser+'get/'+id);
  }
  //#endregion
}
