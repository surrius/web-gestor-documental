import { JobsPrincipal } from '../clases/jobs';
import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class BbddJobsService {

  constructor(private http: Http) {}

  //Fetch all jobs
  getAllJobs(): Observable<JobsPrincipal[]> {
    return this.http.get("https://jsonplaceholder.typicode.com/posts")
      .map(res => res.json());
  }
  
  private extractData(res: Response) {
    let body = res.json();
    console.log('Me has devuelto: ' + body);
    return body;
  }

  private handleError(error: Response | any) {
    console.error('Error controlado desde el servicio: ' + error.message || error);
    return Observable.throw(error.status);
  }
  
}
