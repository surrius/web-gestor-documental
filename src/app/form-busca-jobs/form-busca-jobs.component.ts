import { Component } from '@angular/core';

import { JobsPrincipal } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';

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
  
  //TODO: Var de pruebas
  public resultado: any;
  statusCode: number;
  //TODO: Var de pruebas - Fin
  
  // Servicio a BBDD
  constructor(private bbddJobsService: BbddJobsService) {}
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    
    // Llamamos al método del servicio
    this.bbddJobsService.getAllJobs()
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
    console.log('Entra en metodo limpiar');
    this.jobs = new JobsPrincipal();
  }
}
