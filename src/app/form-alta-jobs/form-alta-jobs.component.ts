import { Component } from '@angular/core';

import { Jobs } from '../clases/jobs';

@Component({
  selector: 'app-form-alta-jobs',
  templateUrl: './form-alta-jobs.component.html',
  styleUrls: ['./form-alta-jobs.component.css']
})
export class FormAltaJobsComponent {
  alta_jobs = new Jobs();
  //Datos para rellenar el combo del grupo de soprote
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  public onSubmit() {
    console.log('ha pulsado en submit en ALTA DE JOBS. Desde método de clase: ' + this.alta_jobs.consulta);
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar ALTA JOBS');
    this.alta_jobs = new Jobs();
  }
}
