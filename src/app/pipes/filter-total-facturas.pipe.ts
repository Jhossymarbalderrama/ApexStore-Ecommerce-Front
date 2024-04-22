import { Pipe, PipeTransform } from '@angular/core';
import { FacturacionRequest } from '../interfaces/facturacionRequest';

@Pipe({
  name: 'filterTotalFacturas'
})
export class FilterTotalFacturasPipe implements PipeTransform {
  transform(facturas: FacturacionRequest[], args: string): FacturacionRequest[] {
    let result : FacturacionRequest[] = [];

    if(!args || args?.length < 1 || args.trim() == ''){
      return facturas;
    }

    for (const ft of facturas) {
      if(ft.total.toString().indexOf(args.toString()) > -1){
        result = [...result, ft];
      }
  }
  
  return result;
  }
}
