import { Component } from '@angular/core';

import { JobsPrincipal } from '../clases/jobs';

@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
  
export class FormBuscaJobsComponent {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;
  
  jobs = new JobsPrincipal();
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar');
    this.jobs = new JobsPrincipal();
  }
}
