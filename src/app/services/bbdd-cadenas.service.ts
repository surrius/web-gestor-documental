import { Cadenas, CadenaPrincipal } from '../clases/cadenas';
import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class BbddCadenasService {

  //URL base
  baseURL = "http://localhost:8080/";

  constructor(private http: Http) {}
  
  //Fetch all articles
    getAllCadenas(): Observable<CadenaPrincipal[]> {
//        return this.http.get(this.baseURL + 'prueba')
//         .map(this.extractData)
//         .catch(this.handleError);
      return this.http.get(this.baseURL + 'prueba')
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
