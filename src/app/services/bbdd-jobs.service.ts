import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Jobs, JobID } from '../clases/jobs';

@Injectable()
export class BbddJobsService {
  // Ruta para llamadas en Local
//  baseURL = "http://localhost:8080/WebGestDoc/";
  
  // Ruta para llamadas en Desarrollo
//  baseURL = "http://ldsgc101.igrupobbva:7270/WebGestDoc/";
  
  // Ruta para llamadas en Desarrollo desde la Junction
  baseURL = "https://de-e-spacio.es.igrupobbva/webgestdoc/WebGestDoc/";
  
  cpHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  //Recupera jobs filtrados por los campos del objeto Job
  getFindJob(job: Jobs): Observable<Jobs[]> {
    let cpParams = new URLSearchParams();
    cpParams.set('job', JSON.stringify(job));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'busca/job', options)
//    return this.http.get('../assets/simulado_job.json')
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Recupera job por ID
  getFindJobId(id: JobID): Observable<Jobs> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'busca/job/id', options)
//    return this.http.get('../assets/simulado_job_id.json')
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Alta de un Job nuevo
  createJob(job: Jobs): Observable<number> {
    let options = new RequestOptions({headers: this.cpHeaders});
    return this.http.post(this.baseURL + 'alta/job', job, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  
  //Modificacion de un Job existente
  updateJob(job: Jobs): Observable<number> {
    let options = new RequestOptions({headers: this.cpHeaders});
    return this.http.put(this.baseURL + 'modifica/job', job, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  
  //Elimina job por ID
  deleteJobID(id: JobID): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'borra/job/id', options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  /* ************************************************************* */
  /* Metodos para la recuperaccion correcta y erronea de los datos */
  /* ************************************************************* */
  private extractData(res: Response) {
    let body = res.json();
    console.log("Respuesta del servicio: " + JSON.stringify(body));
    return body;
  }

  private handleError(error: Response | any) {
    console.error('Error al recuperar datos desde el servidor: ');
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
  
}
