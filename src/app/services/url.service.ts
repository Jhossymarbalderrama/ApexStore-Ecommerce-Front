import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url: any = {
    logo: '../../assets/log.webp',
    bannerTienda: '../../assets/img/banners/sections/store.webp',
    about: '../../assets/img/about/1.webp',
    formCompraCorreoArg: '../../assets/img/payment-form/corroeArg.webp',
    formCompraCorreoAndreani: '../../assets/img/payment-form/correoAndreani.webp',
    profileDefault: '../../assets/img/dashboard/profile_default.webp'
  }

  constructor() { }

}
