import { AplicacionesMain } from '../clases/aplicaciones';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-busca-aplicaciones',
  templateUrl: './form-busca-aplicaciones.component.html',
  styleUrls: ['./form-busca-aplicaciones.component.css']
})
export class FormBuscaAplicacionesComponent {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;

  aplicaciones = new AplicacionesMain();

  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }

  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.aplicaciones));
  }

  public limpiar() {
    console.log('Entra en metodo limpiar');
    this.aplicaciones = new AplicacionesMain();
  }

}
