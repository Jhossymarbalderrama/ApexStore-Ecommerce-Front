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

  public productsLocal: any;
  public productsView: any;

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
    this.loadProductsView();
  }

  // * METHODs
  //#region 


  /**
   * Cargo los productos para visualizarlos en la pagina y filtro repetidos
   */
  loadProductsView() {
    this.productsLocal = this.CartService.products;
    this.productsView = Array.from(
      new Set(this.productsLocal.map((pd: any) => pd.id))
    ).map((id: any) => {
      return this.productsLocal.find((pd: any) => pd.id === id);
    });

    this.productsView.map(
      (pdv: any) => {
        let cant = 0;
        this.productsLocal.map(
          (pdl: any) => {
            pdv.id == pdl.id ? cant++ : 0;
          }
        );
        pdv.cant = cant;
      }
    )
  }

  /**
   * Eliminacion de un producto pasado por parametro del carrito
   * @param prod producto a eliminar del carrito
   */
  deleteProduct(prod: any) {
    this.productsView.map(
      (pd: any) => {

        // Redusco la cant del producto
        if (pd == prod && pd.cant > 0) {
          pd.cant--;
        }

        // Elimino el producto si cant es 0
        if (pd.cant == 0) {
          let i = this.productsView.findIndex((pdv: any) => {
            pdv.id == pd.id
          });
          this.productsView.splice(i, 1);
        }

        return pd;
      }
    );

    this.CartService.svDeleteProductCart(prod);
    this.loadProductsView();
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

  onTienda() {
    if (this.LoginService._svCurrentUserLoginOn.value) {
      this.Router.navigateByUrl('/dashboard/store');
    } else {
      this.Router.navigateByUrl('/store');
    }
  }
  //#endregion
}
