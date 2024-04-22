import { Pipe, PipeTransform } from '@angular/core';
import { ProductRequest } from '../interfaces/productRequest';

@Pipe({
  name: 'filterNameProduct'
})
export class FilterNameProductPipe implements PipeTransform {

  /**
   * 
   * @param value listProduct
   * @param args cadena de filtro (type string) 
   *            (tambien puede ser un array de arguments en ese caso seria: 
   *             ...args: unknown[]
   *            )
   * @returns 
   */
  transform(products: ProductRequest[], args: string): ProductRequest[] {
    let result : ProductRequest[] = [];

    /**
     * Si:
     * -no hay argumentos: devuelvo la lista sin cambios
     * -el argumento esta vacio o nada: devuelvo la lista sin cambios
     */
    if(!args || args?.length < 1 || args.trim() == ''){
      return products;
    }

    /**
     * Filtro sigun el argumento
     */
    for (const pd of products) {
        if(pd.name.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) > -1){
          result = [...result, pd];
        }
    }
    
    return result;
  }

}
