import { Component } from '@angular/core';

import { Jobs } from '../clases/jobs';

@Component({
  selector: 'app-form-consulta-jobs',
  templateUrl: './form-consulta-jobs.component.html',
  styleUrls: ['./form-consulta-jobs.component.css']
})
export class FormConsultaJobsComponent {
//  jobs = new Jobs('', 0, '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', 0, '', '', '');  
  jobs = new Jobs();
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  public onSubmit() {
//    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    console.log('ha pulsado en submit. Desde método de clase: ' + this.jobs.consulta);
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar');
    this.jobs = new Jobs();
  }
}
