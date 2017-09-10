import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  // Control visual de los iconos
  showIconosMenu: boolean = true;
  
  // Controles de las visualizaciones de Jobs
  showBuscaJobs: boolean = false;
  showAltaJobs: boolean = false;
  
  // Control de la barra de navegacion
  navControl: string = 'consulta';
  
  operarJobs() {
    this.showIconosMenu = false;

    switch (this.navControl) {
      case 'consulta':
        this.showBuscaJobs = true;
        break;
      case 'alta':
        this.showBuscaJobs = false;
        this.showAltaJobs = true;
        break;
//      default: statements;
    }
    
  }
}
