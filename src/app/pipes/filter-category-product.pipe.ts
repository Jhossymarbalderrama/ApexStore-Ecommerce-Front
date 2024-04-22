import { Pipe, PipeTransform } from '@angular/core';
import { ProductRequest } from '../interfaces/productRequest';

@Pipe({
  name: 'filterCategoryProduct'
})
export class FilterCategoryProductPipe implements PipeTransform {

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
        if(pd.category.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) > -1){
          result = [...result, pd];
        }
    }
    
    return result;
  }

}
