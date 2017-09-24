import { Component, OnInit } from '@angular/core';

import { EnroutadorService } from '../services/enroutador.service';

@Component({
  selector: 'app-menu-operacion',
  templateUrl: './menu-operacion.component.html',
  styleUrls: ['./menu-operacion.component.css']
})
  
export class MenuOperacionComponent implements OnInit {

  //Variebles que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
  constructor(private data: EnroutadorService) { }
  
  ngOnInit() {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
  }
  
  //Se asigna en el servicio el valor de la operacion seleccionada
  selecciona(oper: string) {
    this.data.changeOperacion(oper);
  }

  // Metodo para identificar el formulario que se abrirá con la directiva Routerlink
  // dependiendo de las variables documento y operacion
  enrutador(oper: string): string {
    let ruta: string;

    // Solo se controlan las 2 casusisticas por que todo lo que no sea un alta
    // nueva, tiene que pasar por el formulario de búsqueda
    switch (oper) {
      case 'alta_nueva':
        
        switch (this.documento) {
          case 'aplicacion':
            ruta = '/form-alta-aplicaciones';
            break;
          case 'cadena':
            ruta = '/form-alta-cadenas';
            break;
          case 'job':
            ruta = '/form-alta-jobs';
            break;
          default:
            ruta = '/iconos-menu';
            break;
        }
        break;
        
      default:  //Cualquier otra operacion
        
        switch (this.documento) {
          case 'aplicacion':
            ruta = '/form-busca-aplicaciones';
            break;
          case 'cadena':
            ruta = '/form-busca-cadenas';
            break;
          case 'job':
            ruta = '/form-busca-jobs';
            break;
          default:
            ruta = '/iconos-menu';
            break;
        }
        
        break;
    }
    return ruta;
  }

}
