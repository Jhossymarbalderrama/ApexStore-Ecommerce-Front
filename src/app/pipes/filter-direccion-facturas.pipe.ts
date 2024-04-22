import { Pipe, PipeTransform } from '@angular/core';
import { FacturacionRequest } from '../interfaces/facturacionRequest';

@Pipe({
  name: 'filterDireccionFacturas'
})
export class FilterDireccionFacturasPipe implements PipeTransform {

  transform(facturas: FacturacionRequest[], args: string): FacturacionRequest[] {
    let result : FacturacionRequest[] = [];

    if(!args || args?.length < 1 || args.trim() == ''){
      return facturas;
    }

    for (const ft of facturas) {
      if(ft.address.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) > -1){
        result = [...result, ft];
      }
  }
  
  return result;
  }

}
