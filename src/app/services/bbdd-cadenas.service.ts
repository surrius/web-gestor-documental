import { Cadenas, CadenaPrincipal } from '../clases/cadenas';
import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class BbddCadenasService {

  //URL base
  baseURL = "http://localhost:8080/GestorDocumentalWeb/";

  constructor(private http: Http) {}

  //Recupera las últimas cadenas insertadas
  getUltimas(): Observable<Cadenas[]> {
    return this.http.get(this.baseURL + 'busca/cadena')
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
