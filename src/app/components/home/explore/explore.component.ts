import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {

  // * ATRIBUTOS
  isHovered: boolean = false;
  sonido: boolean = false;
  perifericos: boolean = false;
  procesadores: boolean = false;
  gaming: boolean = false;
  rgb: boolean = false;
  refrigeracion: boolean = false;

  // * CONSTRUCTOR
  constructor(
    private router: Router
  ) { }

  // * METHODs
  //#region 

  onHover(a: number): void {
    this.resetHover();
    this.hoverSection(a);
    this.isHovered = true;
  }

  onLeave(): void {
    this.isHovered = false;
  }

  resetHover() {
    this.sonido = this.perifericos = this.procesadores = this.gaming = this.rgb = this.refrigeracion = false;
  }

  hoverSection(a: number) {
    switch (a) {
      case 1:
        this.sonido = true;
        break;
      case 2:
        this.perifericos = true;
        break;
      case 3:
        this.procesadores = true;
        break;
      case 4:
        this.gaming = true;
        break;
      case 5:
        this.rgb = true;
        break;
      case 6:
        this.refrigeracion = true;
        break;
    }
  }

  onRouterLink() {
    this.router.navigateByUrl('store');
  }
  //#endregion


}
