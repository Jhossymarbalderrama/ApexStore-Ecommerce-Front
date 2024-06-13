import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // * ATRIBUTOS
  private _cart_cant_product: number = 0;// ? Cantidad de productos que tengo en el carrito
  private _products: Product[] | [] = [];// ? Productos del carrito
  private _subtotal: number = 0;// ? Subtotal de los productos dentro del carrito
  private _total: number = 0;// ? Total de los productos dentro del carrito

  // * GETTERs and SETTERs
  //#region 
  get cart_cant_product(): number {
    return this._cart_cant_product;
  }

  get products(): Product[] | [] {
    return this._products;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  get total(): number {
    return this._total;
  }

  set cart_cant_product(cart_cant_product: number) {
    this._cart_cant_product = cart_cant_product;
  }

  set products(products: Product[] | []) {
    this._products = products;
  }

  set subtotal(subtotal: number) {
    this._subtotal = subtotal;
  }

  set total(total: number) {
    this._total = total;
  }
  //#endregion

  // * CONSTRUCTOR
  constructor(
    private Router: Router,
    private ToastService: ToastService,
    private LoginService: LoginService
  ) {
    this.svResetValuesClass();
    this.svGetLocalStorageProducts();
  }

  // * METHODs
  //#region 
  /**
   *Guardo los products Agregados al Carrito en el LocalStorage
   * @param product  producto a agregar al carrito
   */
  svAddProductCart(product: Product, cantProduct: number) {
    try {      
      for (let i = 0; i < cantProduct; i++) {
        let listProducts: any = this.products;
        let productAdd = {
          id: product.id,
          name: product.name,
          category: product.category,
          img: [product.img[0]],
          price: product.price,
          discount: product.discount
        };
  
        listProducts.push(productAdd);
        this.svResetValuesClass();
        this.products = listProducts; // ? seteo productos 
        this.cart_cant_product = this.cart_cant_product + 1; // ? Sumo cant al carrito view
  
        this.svSaveLocalStorage();   
        this.svCalcularTotalesCart();  
      }
            
      this.ToastService.Info(
        `¡Se ${cantProduct > 1 ? 
          'agregaron los productos': 
          'agrego un producto'} al Carrito!.
          `); 
    } catch (error) {
      this.ToastService.Error('¡Ups!. Error al agregar un producto al carrito. ☹️');
      console.error("Error al agregar al carrito. " + error);
    }
  }

  /**
   * Elimino un Producto del carrito del Localstorage
   * @param product producto a eliminar del carrito
   */
  svDeleteProductCart(product: Product) {
    try {

      this.products = this.products.filter(prod => prod != product);
      this.svSaveLocalStorage();      
      this.svGetLocalStorageProducts();
      this.ToastService.Info('¡Se elimino un producto del Carrito!.'); 
      if (this.products.length == 0) {
        // this.Router.navigateByUrl('/store');
        this.svResetCart();
      }
    } catch (error) {
      this.ToastService.Error('¡Ups!. Error al eliminar un producto del carrito. ☹️');
      console.error("Error al eliminar un producto del carrito. " + error);
    }
  }

  /**
   * Guardo los Productos agregados al carrito en el localstorage
   */
  svSaveLocalStorage() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  /**
   * Obtengo el Carrito con Productos que se guardaron en el localstorage
   */
  svGetLocalStorageProducts() {
    let products = localStorage.getItem('products');
    if (products) {
      this.svResetValuesClass();
      this.products = JSON.parse(products);
      this.cart_cant_product = this.products.length;

      this.svCalcularTotalesCart();
    }
  }

  /**
   * Calcula El SubTotal y el Total de los productos que se encuentran en el carrito
   */
  svCalcularTotalesCart() {
    this.products.forEach(pd => {
      this.subtotal += pd.price - ((pd.price * pd.discount) / 100);
      this.total += pd.price - ((pd.price * pd.discount) / 100);
    });
  }

  svResetValuesClass() {
    this._products = [];
    this._subtotal = 0;
    this._total = 0;
  }

  /**
   * Reset a carrito de compra
   */
  svResetCart(){
    localStorage.removeItem('products');
    this.svResetValuesClass();
    this._cart_cant_product = 0;
    if(this.LoginService._svCurrentUserLoginOn.value){
      this.Router.navigateByUrl('dashboard/store');
    }else{
      this.Router.navigateByUrl('store');
    }
  }
  //#endregion

}
