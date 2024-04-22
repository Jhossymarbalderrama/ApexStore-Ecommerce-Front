import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit {

  // * ATRIBUTOS
  public subtotal: number = 0; 
  public total: number = 0;
  public tieneProductCart: boolean = false;

  // * CONSTRUCTOR
  constructor(
    public CartService: CartService,
    private AuthService: AuthService,
    private LoginService: LoginService,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.loadTotalCart();
    
    this.tieneProductCart = this.CartService.products.length == 0;
  }

  // * METHODs
  //#region 
  
  /**
   * Eliminacion de un producto pasado por parametro del carrito
   * @param prod producto a eliminar del carrito
   */
  deleteProduct(prod: Product) {
    this.CartService.svDeleteProductCart(prod);
    this.loadTotalCart();
  }

  /**
   * Cargar total y subtotal de los productos agregados en el carrito
   */
  loadTotalCart() {
    this.subtotal = this.CartService.subtotal;
    this.total = this.CartService.total;
  }

  /**
   * Boton de Compra de producto 
   */
  buyProducts() {
    if (this.LoginService._svCurrentUserLoginOn.value) {
      this.Router.navigateByUrl('/dashboard/payment-form');
    } else {
      this.Router.navigateByUrl('/login');

    }
  }

  onTienda(){
    if(this.LoginService._svCurrentUserLoginOn.value) {
      this.Router.navigateByUrl('/dashboard/store');
    } else {
      this.Router.navigateByUrl('/store');
    }
  }
  //#endregion
}
