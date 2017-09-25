import { Component, Input } from '@angular/core';

import { CadenaPrincipal } from '../clases/cadenas';
import { BbddCadenasService } from '../services/bbdd-cadenas.service';

@Component({
  selector: 'app-form-busca-cadenas',
  templateUrl: './form-busca-cadenas.component.html',
  styleUrls: ['./form-busca-cadenas.component.css']
})
export class FormBuscaCadenasComponent {
  
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;

  cadenas = new CadenaPrincipal();
  
  //TODO: Var de pruebas
  public resultado: any[];
  statusCode: number;
  //TODO: Var de pruebas - Fin

  // Servicio a BBDD
  constructor(private bbddCadenasService: BbddCadenasService) {}
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  public onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));
    
    //Fetch pruebas cadenas
//    this.bbddCadenasService.getAllCadenas()
//      .subscribe(
//        data => this.resultado = data,
//        errorCode => this.statusCode = errorCode);

    // Llamamos al método del servicio
    this.bbddCadenasService.getAllCadenas()
      .subscribe(
      result => {
        this.resultado = result;

        console.log('Resultado de llamada al Servicio web: ' + JSON.stringify(this.resultado));
      },
      error => {
        alert("Error en la petici&oacute;n");
      }
      );
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar busca-cadenas');
    this.cadenas = new CadenaPrincipal();
  }

}
