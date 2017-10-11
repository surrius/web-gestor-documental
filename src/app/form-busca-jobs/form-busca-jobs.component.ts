import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Jobs, JobID } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
  
export class FormBuscaJobsComponent implements OnInit {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;
  
  // Variable a la que asociamos como onjeto NgForm, el formulario de búsqueda
  @ViewChild('buscaJobsForm') formulario: NgForm;
  
  //Variable asociada al formulario de búsqueda
  jobs = new Jobs();
  ini_id = {
    cod_aplicaci: null,
    cod_jobpl: null
  };
  
  //TODO: Eliminar cuando se recupere correctamente
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  // Variables informadas con el servicio a la BBDD de Jobs
  errorMessage: string;
  statusCode: number;
  jobs_res: Jobs[];
  
  //Variables de la tabla de datos
  reorderable: boolean = true;
  selected = [];
 
  constructor(
    private bbddJobsService: BbddJobsService,
    private router: Router
    ) {
    //Se inicializa el objeto interno de la cadena para que no de error TypeError por no estar
    //definida en la template (html) cuando se renderiza la página
    this.jobs.id = this.ini_id;
  }
  
  ngOnInit(): void {
  }
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  // Metodo para el envio del formulario 
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    console.log(this.jobs);
    this.bdBusca(this.jobs);
    this.formulario.control.disable();
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.formulario.control.reset();
    //console.log('Entra en metodo limpiar');    
    //console.log("Los Jobs recuperados son: " + this.jobs_res);
    this.jobs = new Jobs();
    this.jobs.id = this.ini_id;
    this.jobs.id.cod_aplicaci = null;
    this.jobs.id.cod_jobpl = null;
    this.formulario.control.enable();
  }
  
  /* ****************************************************************** */
  /*  Métodos para las operaciones CRUD con los elementos de las tablas */
  /* ****************************************************************** */
  consulta(row) {
    this.router.navigate(['/form-alta-jobs', row.id]);
  }
  
  elimina(row) {
    if(confirm("Se va a proceder a la eliminacion del registro. ¿Está Seguro?")) {
      console.log(row.id.cod_aplicaci + ' ' + row.id.cod_jobpl);
      let jobID = new JobID();
      jobID.cod_aplicaci = row.id.cod_aplicaci;
      jobID.cod_jobpl = row.id.cod_jobpl;
      
      this.bdBorra(jobID);
    }
  }
  
  /* ****************************************************************** */
  /*    Métodos para las operaciones CRUD de invocacion al servicio     */
  /* ****************************************************************** */
  bdBusca(job: Jobs) {
    this.bbddJobsService.getFindJob(job).subscribe(
      data => this.jobs_res = data,
      error => this.errorMessage = <any>error);
  }
  
  bdBorra(id: JobID) {
    this.bbddJobsService.deleteJobID(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        console.log('Resultado delete: ' + this.statusCode);
        this.bdBusca(this.jobs);
      },
      errorCode => this.statusCode = errorCode
      );
  }
  
  /* ****************************************************************** */
  /*            Métodos de operacion con el plugin de tablas            */
  /* ****************************************************************** */
  onSelect({selected}) {
    //console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }
  
}