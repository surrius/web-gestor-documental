import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JobsPrincipal } from '../clases/jobs';

@Injectable()
export class BbddJobsService {

  constructor(private http: Http) {}

  //Lectura de todos los jobs
  getAllJobs(): Observable<JobsPrincipal[]> {
    return this.http.get("https://my-json-server.typicode.com/surrius/pruebas-data/db")
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("Respuesta del servicio: " + JSON.stringify(body));
    return body;
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
  
}
