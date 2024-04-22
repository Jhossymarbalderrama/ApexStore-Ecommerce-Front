import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // * CONSTRUCTOR
  constructor(
    private MessageService: MessageService
  ) { }

  // * METHODs
  //#region 
  /**
   * Mensaje de que todo salio bien
   * @param message 
   */
  Success(message: string) {
    this.MessageService.clear();
    this.MessageService.add({ severity: 'success', summary: 'Petición procesada. 😀', detail: message });
  }

  /**
   * Mensaje de informacion
   * @param message 
   */
  Info(message: string) {
    this.MessageService.clear();
    this.MessageService.add({ severity: 'info', summary: 'Info.', detail: message });
  }

  /**
   * Mensaje de Alerta
   * @param message 
   */
  Warn(message: string) {
    this.MessageService.clear();
    this.MessageService.add({ severity: 'warn', summary: '¡Atención!. 🤨', detail: message });
  }

  /**
   * Mensaje de un error
   * @param message 
   */
  Error(message: string) {
    this.MessageService.clear();
    this.MessageService.add({ severity: 'error', summary: 'Algo salio mal...', detail: message });
  }
  //#endregion
}
