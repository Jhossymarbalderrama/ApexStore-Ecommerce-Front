import { state } from '@angular/animations';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Factura_State } from 'src/app/enums/Factura_State';
import { FacturacionRequest } from 'src/app/interfaces/facturacionRequest';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-shop-history',
  templateUrl: './form-shop-history.component.html',
  styleUrls: ['./form-shop-history.component.css']
})
export class FormShopHistoryComponent {

  @Output() refreshList: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('estadoSelect') estadoSelect: any;

  public factura: any;
  public mode: any;
  private stateF: string[] = [];
  public statesFacturas: string[] = Object.keys(Factura_State).filter((key: any) => !isNaN(Number(Factura_State[key])));
  private stateDefault: string = 'Seleccione Estado';
  public selectedState: string = this.stateDefault;
  public requiredSelect: boolean = false;
  constructor(
    private FacturacionService: FacturacionService,
    private ToastService: ToastService
  ) {

  }

  public closeModal(): void {
    const modal = document.getElementById('modal-datail-factura');
    modal?.classList.add('hidden');
  }

  public loadFormModal(data: any): void {
    if (data) {
      this.factura = data.item;
      this.mode = data.action;
      this.requiredSelect = false;
    }
  }

  public action() {
    switch (this.mode) {
      case 1:
        this.cambiarEstadoFactura();
        break;
      case 2:
        this.cancelarFactura();
        break;

    }
  }

  private cancelarFactura() {
    let rqFactura: FacturacionRequest = {
      id: this.factura.id,
      email: this.factura.email,
      name: this.factura.name,
      address: this.factura.address,
      cp: this.factura.cp,
      method: this.factura.method,
      subtotal: this.factura.subtotal,
      total: this.factura.total,
      id_user: this.factura.id_user,
      state: this.factura.state,
      date: this.factura.date
    } as FacturacionRequest;

    this.ToastService.showOverlay = true;

    this.FacturacionService.svCancelFactura(rqFactura).subscribe(res => {
     setTimeout(() => {
      res ? this.refreshListFacturas(true) : this.refreshListFacturas(false);
      this.ToastService.showOverlay = false;
     }, 1000);
    });

    this.closeModal();
  }

  private cambiarEstadoFactura() {
    const valorSeleccionado = this.estadoSelect.nativeElement.value;
    if (this.statesFacturas.includes(valorSeleccionado)) {
      if (valorSeleccionado == 'CANCELADO') {
        this.cancelarFactura();
      } else {
        let rqFactura: FacturacionRequest = {
          id: this.factura.id,
          email: this.factura.email,
          name: this.factura.name,
          address: this.factura.address,
          cp: this.factura.cp,
          method: this.factura.method,
          subtotal: this.factura.subtotal,
          total: this.factura.total,
          id_user: this.factura.id_user,
          state: this.factura.state,
          date: this.factura.date
        } as FacturacionRequest;

        rqFactura.state = valorSeleccionado;
        this.ToastService.showOverlay = true;

        this.FacturacionService.svUpdateFactura(rqFactura).subscribe(res => {
          setTimeout(() => {
            res ? this.refreshListFacturas(true) : this.refreshListFacturas(false);
            this.ToastService.showOverlay = false;
          }, 1000);
        });

        this.selectedState = this.stateDefault;
        this.estadoSelect.nativeElement.value = this.stateDefault;
        this.closeModal();
      }
    } else {
      this.requiredSelect = true;
    }
  }

  private refreshListFacturas(value: boolean) {
    this.refreshList.emit(value);
  }
}
