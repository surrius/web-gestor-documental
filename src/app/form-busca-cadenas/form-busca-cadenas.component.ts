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

  cadenas = new CadenaPrincipal();
  
  public posts;

  // cargamos el servicio
  constructor(private comunicacionService: ComunicacionService) {}
  
  public onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));

    // Llamamos al método del servicio
    this.comunicacionService.getPosts()
      .subscribe(
      result => {
        this.posts = result;

        console.log('Resultado de llamada al Servicio web: ' + JSON.stringify(this.posts));
      },
      error => {
        alert("Error en la petición");
      }
      );
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar busca-cadenas');
    this.cadenas = new CadenaPrincipal();
  }

}
