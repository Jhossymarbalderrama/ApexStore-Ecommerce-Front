import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url: any = {
    logo: '../../assets/logo-bcd.webp',
    logo_dark: '../../assets/logo-bcd-dark.webp',
    about: '../../assets/img/about/1.webp',
    formCompraCorreoArg: '../../assets/img/payment-form/corroeArg.webp',
    formCompraCorreoAndreani: '../../assets/img/payment-form/correoAndreani.webp',
    profileDefault: '../../assets/img/dashboard/profile_default.webp'
  }

  constructor() { }

}
