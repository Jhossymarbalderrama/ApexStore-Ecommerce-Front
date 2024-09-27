import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  @Output() categoryItemEvent = new EventEmitter<string>();

  // * ATRIBUTOS
  private categorySelect: string = '';
  public get rutaActual(): string {
    return this.router.url;
  }

  public get isHome(): boolean {
    return this.rutaActual == '/home';
  }

  // * CONSTRUCTOR
  constructor(
    private router: Router,
    public data: DataService
  ) {}

  // * METHODs
  //#region 

  /**
   * Envio la cateria al componente para filtrar
   * @param category 
   */
  goToStoreByCategory(category: string) {
    if (this.isHome) {
      this.router.navigateByUrl('/store');
    } else {
      if (this.categorySelect != category) {
        this.categorySelect = category;
        this.categoryItemEvent.emit(category);
      } else {
        this.categorySelect = '';
        this.categoryItemEvent.emit('');
      }
    }
  }
  //#endregion
}
