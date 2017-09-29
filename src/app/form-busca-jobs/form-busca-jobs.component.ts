import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';

import { Jobs } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
  
export class FormBuscaJobsComponent implements OnInit {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;
  
  //Variable asociada al formulario de búsqueda
  jobs = new Jobs();
  ini_id = {
      cod_aplicaci: '',
      cod_jobpl: 0
    };
  
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  // Variables informadas con el servicio a la BBDD de cadenas
  errorMessage: string;
  observableJobs: Observable<Jobs[]>;
  jobs_res: Jobs[];
  
  //Variables de la tabla de datos
  dataSource = new ExampleDataSource();
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  
  //Variables del plugin Datatables
//  public filterQuery = "";
//  public rowsOnPage = 5;
//  public sortBy = "email";
//  public sortOrder = "asc";
  
  // Servicio a BBDD
  constructor(private bbddJobsService: BbddJobsService) {
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
  
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    console.log(this.jobs);
    this.bdBusca(this.jobs);
    
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar');    
    console.log("Los Jobs recuperados son: " + this.jobs_res);
    this.jobs = new Jobs();
  }
  
  bdBusca(job: Jobs) {
//    this.observableJobs = this.bbddJobsService.getFindJob();
    this.bbddJobsService.getFindJob().subscribe(
      data => this.jobs_res = data,
      error => this.errorMessage = <any>error);
  }
  
//  connect(): Observable<Jobs[]> {
//    return Observable.of(this.jobs_res);
//  }
}

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Jobs[]> {
    return Observable.of(this.jobs_res);
  }

  disconnect() {}
}
