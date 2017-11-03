import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

import { Jobs, JobID } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';
import { EnroutadorService } from '../services/enroutador.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Subject } from 'rxjs/Subject';
import { BuscaGrupoSoporteComponent } from '../busca-grupo-soporte/busca-grupo-soporte.component';


@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
  
export class FormBuscaJobsComponent implements OnInit {
  // Control para visualizar mas o menos campos de búsqueda y ayudas
  masCampos: boolean = false;
  show = false;
  mostrarCampos = false;

  //Campos visualizables en la busqueda de la tabla
  chk_jobname: boolean = true;
  chk_documento: boolean = true;
  chk_uuaa: boolean = false;
  chk_grsoporte: boolean = true;
  chk_maqorigen: boolean = true;
  chk_liborigen: boolean = true;
  chk_estructura: boolean = false;
  chk_periodicidad: boolean = false;

  // Variable a la que asociamos como onjeto NgForm, el formulario de búsqueda
  @ViewChild('buscaJobsForm') formulario: NgForm;
  
  // Variable que almacenara el contenido del componente BuscaGrupoSoporteComponent
  @ViewChild(BuscaGrupoSoporteComponent) public buscaGRS: BuscaGrupoSoporteComponent;

  //Variables que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;

  //Variable asociada al formulario de búsqueda
  jobs = new Jobs();
  ini_id = {
    cod_aplicaci: null,
    cod_jobpl: null
  };
  
  // Variables informadas con el servicio a la BBDD de Jobs
  errorMessage: string;
  statusCode: number;
  jobs_res: Jobs[];
  
  //Variables de la tabla de datos
  reorderable: boolean = true;
  selected = [];
 
  constructor(
    private bbddJobsService: BbddJobsService,
    private router: Router,
    private data: EnroutadorService
    ) {
    //Se inicializa el objeto interno de la cadena para que no de error TypeError por no estar
    //definida en la template (html) cuando se renderiza la página
    this.jobs.id = this.ini_id;
  }
  
  ngOnInit(): void {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
  }
  
  //Metodo que modificara el booleano masCampos al valor contrario y la ayuda
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }

  get stateName() {
    return this.show ? 1 : 0;
  }

  toggle() {
    this.show = !this.show;
  }
  
  // Metodo para el envio del formulario 
  public onSubmit() {
    // Mapeamos a mano el grupo de soporte que cargamos de manera especial
    this.jobs.des_gsoporte = this.buscaGRS.seleccionBusca;
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    console.log(this.jobs);
    this.bdBusca(this.jobs);
    /*this.formulario.control.disable();*/
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.formulario.control.reset();
    this.buscaGRS.seleccionBusca = null;
    //console.log('Entra en metodo limpiar');    
    //console.log("Los Jobs recuperados son: " + this.jobs_res);
    this.jobs = new Jobs();
    this.jobs.id = this.ini_id;
    this.jobs.id.cod_aplicaci = null;
    this.jobs.id.cod_jobpl = null;
    this.formulario.control.enable();
  }
  
  // Metodo que compone el objeto que se enviará al servidor para la modificacion del grupo de Soporte
  modMasivaGSoporte() {
    if (confirm("Se van a modificar los grupos de soporte de varios Jobs. ¿Proceder?")) {
      class ElemModif {
        grupo_soporte: string;
        jobs: JobID[];
      }
      
      let elemModif = new ElemModif();

      let array_jobs: JobID[] = new Array<JobID>();

      for (let data of this.selected) {
        let jobID = new JobID();
        jobID.cod_aplicaci = data.id.cod_aplicaci;
        jobID.cod_jobpl = data.id.cod_jobpl;
        array_jobs.push(jobID);
      }

      elemModif.grupo_soporte = this.buscaGRS.seleccion;
      elemModif.jobs = array_jobs;

      /*console.log(JSON.stringify(elemModif));*/
      this.modificaGrupoSoporte(elemModif);
    }           
  }

  borradoMasivo() {
    if (confirm("Se van a eliminar varios jobs masivamente. ¿Proceder?")) {
      class ElemBorra {
        jobs: JobID[];
      }
      
      let elemBorra = new ElemBorra();

      let array_jobs: JobID[] = new Array<JobID>();

      for (let data of this.selected) {
        let jobID = new JobID();
        jobID.cod_aplicaci = data.id.cod_aplicaci;
        jobID.cod_jobpl = data.id.cod_jobpl;
        array_jobs.push(jobID);
      }

      elemBorra.jobs = array_jobs;

      console.log(JSON.stringify(elemBorra));
      this.borradoMasivoJob(elemBorra);
    }
  }

  // Metodo para configurar el origen de la llamada a la ventana modal de grupo de soporte
  setOrigen(info: string) {
    this.buscaGRS.seleccion = '';
    this.buscaGRS.origen = info;
  }  
  
  /* ****************************************************************** */
  /*  Métodos para las operaciones CRUD con los elementos de las tablas */
  /* ****************************************************************** */
  consulta(row) {
    this.operacion = 'consulta';
    this.data.changeOperacion(this.operacion);
    this.router.navigate(['/form-alta-jobs', row.id]);
  }

  modificacion(row) {
    this.operacion = 'modificacion';
    this.data.changeOperacion(this.operacion);
    this.router.navigate(['/form-alta-jobs', row.id]);
  }

  copiar(row) {
    this.operacion = 'copia';
    this.data.changeOperacion(this.operacion);
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

  modificaGrupoSoporte(elemModif) {
    this.bbddJobsService.updateGSoporte(elemModif)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado Modificacion Job: ' + this.statusCode); //Cod correcto = 201
        alert('Grupos de soporte modificados correctamente');
        this.bdBusca(this.jobs);

      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error en servidor al modificar grupo de soporte masivamente.');      
      });
  }

  borradoMasivoJob(elemBorra) {
    this.bbddJobsService.deleteMasivo(elemBorra)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado borrado masivo Jobs: ' + this.statusCode); //Cod correcto = 201
        alert('Jobs eliminados correctamente');
        this.bdBusca(this.jobs);

      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error en servidor al borrar masivamente.');      
      });
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

  toggleMostrarCampos() {
    this.mostrarCampos = !this.mostrarCampos;
  }

}