import { Component, Input } from '@angular/core';

import { CadenaPrincipal } from '../clases/cadenas';

@Component({
  selector: 'app-form-busca-cadenas',
  templateUrl: './form-busca-cadenas.component.html',
  styleUrls: ['./form-busca-cadenas.component.css']
})
export class FormBuscaCadenasComponent {

  // Control de visualizacion del componente
//  @Input() showMe: boolean;
  
  cadenas = new CadenaPrincipal();
  
  public onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar busca-cadenas');
    this.cadenas = new CadenaPrincipal();
  }

}
