import { Component } from '@angular/core';

import { JobsPrincipal } from '../clases/jobs';

@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
export class FormBuscaJobsComponent {
//  jobs = new Jobs('', 0, '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', 0, '', '', '');  
  jobs = new JobsPrincipal();
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  public onSubmit() {
//    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    console.log('ha pulsado en submit. Desde método de clase: ' + this.jobs.consulta);
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar');
    this.jobs = new JobsPrincipal();
  }
}
