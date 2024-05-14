import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  // * ATRIBUTOS
  public _idProductParam: number | undefined;
  public _product: Product | any;
  public _subProduct: Subscription | undefined;
  public _price_discound: number = 0;

  public _galery: Array<String> = [];
  public _renderGalery: Boolean = true;
  public _currentImg: string | undefined;

  public cantProdBuysRandom: number = Math.floor(Math.random() * 100);
  public dashboard: boolean = false;

  // * CONSTRUCTOR
  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    private cartServ: CartService,
    private Location: Location,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this._idProductParam = parseInt(this.route.snapshot.params['id']); 
    if (this.productServ.listProducts) {
      this._product = this.productServ.listProducts.filter((p: any) => p.id === this._idProductParam)[0];
            
      if (this._product) {
        this._price_discound = this._product.price - ((this._product.price * this._product.discount) / 100);
        this._currentImg = this._product.img[0];
      } else {
        this.Location.back();
      }
    }
  
    this.Router.url.split("/")[1] != 'store' ? this.dashboard = true : this.dashboard = false;     
  }

  // * METHODs
  //#region 

  ngOnDestroy(): void {
    this._subProduct?.unsubscribe();
  }

  handleChangeImg(itemIMG: string): void {
    this._currentImg = itemIMG;
  }

  addCart() {
    if (this._product) {
      this.cartServ.svAddProductCart(this._product);
    }
  }
  //#endregion


}
