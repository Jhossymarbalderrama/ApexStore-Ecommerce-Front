import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { Factura_State } from 'src/app/enums/Factura_State';
import { FacturacionRequest } from 'src/app/interfaces/facturacionRequest';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  // * ATRIBUTOS
  // #region
  public cartProduct!: Product[] | [];
  public cart_cant_product!: number;
  public subTotal!: number;
  public total!: number;
  public shippingSelect: any;
  public shippingMethod: any;

  public formPayment: FormGroup = this.FormBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'card-full-name': ['', [Validators.required]],
    'address': ['', [Validators.required]],
    'cp': ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    'cardNro': ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
    'creditExpiry': ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    'creditCvc': ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    'method': ['', Validators.required]
  });

  //#endregion

  // * GETTERs Form Payment
  // #region
  get email() {
    return this.formPayment.controls['email'];
  }

  get cardFullName() {
    return this.formPayment.controls['card-full-name'];
  }

  get address() {
    return this.formPayment.controls['address'];
  }

  get codigoPostal() {
    return this.formPayment.controls['cp'];
  }

  get cardNro() {
    return this.formPayment.controls['cardNro'];
  }

  get creditExpiry() {
    return this.formPayment.controls['creditExpiry'];
  }

  get creditCvc() {
    return this.formPayment.controls['creditCvc'];
  }

  get method() {
    return this.formPayment.controls['method'];
  }

  get listIdProducts(): number[] {
    let listIdProd: number[] = [];
    this.cartProduct.forEach(pd => {
      listIdProd.push(pd.id);
    });
    return listIdProd;
  }
  // #endregion

  // * CONSTRUCTOR
  // #region
  constructor(
    private CartService: CartService,
    private FormBuilder: FormBuilder,
    private AuthService: AuthService,
    private FacturacionService: FacturacionService,
    private DeliveryService: DeliveryService,
    private ToastService: ToastService,
    private Router: Router
  ) {
    if (this.AuthService.userData == null || this.AuthService.userData == undefined) {
      this.AuthService.svGetUserData();
    }

    this.DeliveryService.svGetListDelivery().subscribe(
      rp => {
        this.shippingMethod = rp;
      }
    );
  }

  ngOnInit(): void {
    this.cartProduct = this.CartService.products;
    this.cart_cant_product = this.CartService.cart_cant_product;
    this.subTotal = this.CartService.subtotal;
  }
  // #endregion

  // * METHODs
  //#region 

  /** Capturo el metodo de envio y llama a calcular el total a pagar
   * @param shipping Metodo de envio
   */
  selectShipping(shipping: any) {
    this.shippingSelect = shipping;
    this.calcularTotalconEnvio();
  }

  /**Calculo el total a pagar
   */
  calcularTotalconEnvio() {
    this.total = this.CartService.total + this.shippingSelect.price;
  }

  /** Envio el form de Payment a pagar
   * 
   */
  sendForm() {
    if (this.formPayment.valid) {
      this.CartService.svCalcularTotalesCart();
      let products = this.listIdProducts;
      // let fechaAlta = new Date(); // * Lo setea la fecha de alta el backend

      let facturacionRequest: any = {
        email: this.formPayment.controls['email'].value,
        name: this.formPayment.controls['card-full-name'].value,
        address: this.formPayment.controls['address'].value,
        cp: this.formPayment.controls['cp'].value,
        method: 1,
        subtotal: this.subTotal,
        total: this.total,
        id_user: this.AuthService.userData.id,
        state: Factura_State[0],
        date: ""
      } as any;

      this.ToastService.showOverlay = true;

      this.FacturacionService.svAltaFacturacion(facturacionRequest, products).subscribe(
        () => {
          this.formPayment.reset();
          this.CartService.svResetCart();
          setTimeout(() => {
            this.ToastService.showOverlay = false;
            this.Router.navigateByUrl('/dashboard/shopping-history');      
          }, 1000);
        }
      );

    } else {
      this.formPayment.markAllAsTouched();
      this.ToastService.Warn('Debe llenar todos los campos del formulario.');
    }
  }  
  //#endregion
}
