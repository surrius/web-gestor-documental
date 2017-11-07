import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Aplicaciones, AppID } from '../clases/aplicaciones';

@Injectable()
export class BbddAplicacionesService {
  // Ruta para llamadas en Local
//  baseURL = "http://localhost:8080/WebGestDoc/";
  
  // Ruta para llamadas en Desarrollo
//  baseURL = "http://ldsgc101.igrupobbva:7270/WebGestDoc/";
  
  // Ruta para llamadas en Desarrollo desde la Junction
 /* baseURL = "https://de-e-spacio.es.igrupobbva/webgestdoc/WebGestDoc/";*/
  
  cpHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  // Metodo para recuperar la máquina y resolver el entorno
  get baseURL(): string {
    return window.location.protocol + '//' + window.location.host + '/WebGestDoc/';
  }

  //Recupera aplicaciones filtradss por los campos del objeto Aplicacion
  getFindAplicacion(aplicacion: Aplicaciones): Observable<Aplicaciones[]> {
    let cpParams = new URLSearchParams();
    cpParams.set('aplicacion', JSON.stringify(aplicacion));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'busca/aplicacion', options)
   /*return this.http.get('../assets/simulado_aplicacion.json')*/
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Recupera aplicacion por ID
  getFindAplicacionId(id: AppID): Observable<Aplicaciones> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'busca/aplicacion/id', options)
   /*return this.http.get('../assets/simulado_aplicacion_id.json')*/
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Alta de una Aplicacion nueva
  createAplicacion(aplicacion: Aplicaciones): Observable<AppID> {
    let options = new RequestOptions({headers: this.cpHeaders});
    return this.http.post(this.baseURL + 'alta/aplicacion', aplicacion, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Modificacion de una Aplicacion existente
  updateAplicacion(aplicacion: Aplicaciones): Observable<AppID> {
    let options = new RequestOptions({headers: this.cpHeaders});
    return this.http.post(this.baseURL + 'modifica/aplicacion', aplicacion, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  //Elimina aplicacion por ID
  deleteAppID(id: AppID): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'borra/aplicacion/id', options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Eliminacion masiva de Jobs
  deleteMasivo(elemBorra): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('borra', JSON.stringify(elemBorra));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + 'borrado/masivo/aplicacion', options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  //Recupera PDF
  /*getAplicacionPDF(id: AppID): Observable<number> {
    let cpParams = new URLSearchParams();
    cpParams.set('id', JSON.stringify(id));
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
    return this.http.get(this.baseURL + '/aplicacion/generaPDF', options)
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
