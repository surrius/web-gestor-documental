import { Component, Input } from '@angular/core';

import { JobsPrincipal } from '../clases/jobs';

@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
  
export class FormBuscaJobsComponent {
  // Control de visualizacion del componente
  @Input() showMe: boolean;
  
  jobs = new JobsPrincipal();
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar');
    this.jobs = new JobsPrincipal();
  }
}
