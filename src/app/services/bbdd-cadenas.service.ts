import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Cadenas, CdnID } from '../clases/cadenas';

@Injectable()
export class BbddCadenasService {
  // Ruta para llamadas en Local
//  baseURL = "http://localhost:8080/WebGestDoc/";
  
  // Ruta para llamadas en Desarrollo
//  baseURL = "http://ldsgc101.igrupobbva:7270/WebGestDoc/";
  
  // Ruta para llamadas en Desarrollo a tarves de la Junction
  baseURL = "https://de-e-spacio.es.igrupobbva/webgestdoc/WebGestDoc/";

  cpHeaders = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) {}

  //Recupera cadenas filtrados por los campos del objeto Cadena
  getFindCadena(cadena: Cadenas): Observable<Cadenas[]> {
    let cpParams = new URLSearchParams();
    cpParams.set('cadena', JSON.stringify(cadena));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'busca/cadena', options)
//    return this.http.get('../assets/simulado_cdn.json')
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Recupera cadena por ID
  getFindCadenaId(id: CdnID): Observable<Cadenas> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'busca/cadena/id', options)
//    return this.http.get('../assets/simulado_cdn_id.json')
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Alta de una Cadena nueva
  createCadena(cadena: Cadenas): Observable<number> {
    let options = new RequestOptions({headers: this.cpHeaders});
    return this.http.post(this.baseURL + 'alta/cadena', cadena, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  
  //Modificacion de una cadena existente
  updateCadena(cadena: Cadenas): Observable<number> {
    let options = new RequestOptions({headers: this.cpHeaders});
    return this.http.put(this.baseURL + 'modifica/cadena', cadena, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  
  //Elimina cadena por ID
  deleteCdnID(id: CdnID): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'borra/cadena/id', options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Eliminacion masiva de Cadenas
  deleteMasivo(elemBorra): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('borra', JSON.stringify(elemBorra));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'borrado/masivo/cadena', options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Recupera PDF
  /*getCadenaPDF(id: CdnID): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + '/cadena/generaPDF', options)
      .map(success => success.status)
      .catch(this.handleError);
  }*/

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
