import { Component, Input } from '@angular/core';

import { CadenaPrincipal } from '../clases/cadenas';
//Servicio de comunicacion
import { ComunicacionService } from '../services/comunicacion.service';

@Component({
  selector: 'app-form-busca-cadenas',
  templateUrl: './form-busca-cadenas.component.html',
  styleUrls: ['./form-busca-cadenas.component.css']
})
export class FormBuscaCadenasComponent {
  
  // Control para visualizar mas o menos campos de b�squeda
  masCampos: boolean = false;

  cadenas = new CadenaPrincipal();
  
  public posts;

  // cargamos el servicio
  constructor(private comunicacionService: ComunicacionService) {}
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  public onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));

    // Llamamos al m�todo del servicio
    this.comunicacionService.getPosts()
      .subscribe(
      result => {
        this.posts = result;

        console.log('Resultado de llamada al Servicio web: ' + JSON.stringify(this.posts));
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
