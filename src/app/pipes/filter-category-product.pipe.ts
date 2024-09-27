import { Pipe, PipeTransform } from '@angular/core';
import { ProductRequest } from '../interfaces/productRequest';

@Pipe({
  name: 'filterCategoryProduct'
})
export class FilterCategoryProductPipe implements PipeTransform {

  transform(products: ProductRequest[], args: string): ProductRequest[] {
    let result: ProductRequest[] = [];

    if (!args || args?.length < 1 || args.trim() == '') {
      return products;
    }

    result = products.filter(pd => this.similarMatch(pd.category, args));

    return result;
  }

  similarMatch(input: string, target: string): boolean {
    return input.toLocaleLowerCase().includes(target.toLocaleLowerCase()) ||
      target.toLocaleLowerCase().includes(input.toLocaleLowerCase());
  }
}
