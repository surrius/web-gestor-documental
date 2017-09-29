import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Jobs } from '../clases/jobs';

@Injectable()
export class BbddJobsService {
  
  //URL base
  baseURL = "http://localhost:8080/GestorDocumentalWeb/";
  cpHeaders = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.cpHeaders});

  constructor(private http: Http) {}

  //Recupera las últimas cadenas insertadas
  getFindJob(): Observable<Jobs[]> {
//    return this.http.get(this.baseURL + 'busca/cadena')
    return this.http.get('../assets/simulado_job.json')
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Alta de una cadena
  createJob(job: Jobs): Observable<number> {
    return this.http.post(this.baseURL + 'alta/job', job, this.options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("Respuesta del servicio: " + JSON.stringify(body));
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
  
}
