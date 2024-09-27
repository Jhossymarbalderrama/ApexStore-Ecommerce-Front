import { Injectable } from '@angular/core';
import  data  from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // ? Data Home
  //#region 
  public get getDataHome(): any{
    return data.home;
  }

  public get getDataSliderHome():any{
    return data.home.slider_imgs;
  }

  public get getDataShippingHome():any{
    return data.home.shippingMethods;
  }

  public get getDataCategoriesHome():any{
    return data.home.categories;
  }
  //#endregion

 // ? Data Store
 //#region 
  public get getTitleStore():string{
    return data.store.title;
  }
 //#endregion

  // ? Data About
  //#region

  public get getTitleAbout():string{
    return data.about.title;
  }

  public get getDataAbout():any{
    return data.about;
  }

  //#endregion

  // ? Data Contact
  //#region 
  public get getDataContact():any{
    return data.contact;
  }
  //#endregion
}
