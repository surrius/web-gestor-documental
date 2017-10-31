import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EnroutadorService {

  // Variables para la comunicacion HTTP
  cpHeaders = new Headers({'Content-Type': 'application/json'});

  // Variables de control para definir la ruta y configuracion como Observables
  private documento = new BehaviorSubject<string>('ninguno');
  private operacion = new BehaviorSubject<string>('ninguna');
  
  currentDocumento = this.documento.asObservable();
  currentOperacion = this.operacion.asObservable();
  
  constructor(private http: Http) { }

  // Metodo para recuperar la máquina y resolver el entorno
  get baseURL(): string {
    return window.location.protocol + '//' + window.location.host + '/WebGestDoc/';
  }
  
  // Metodo para modificar el documento
  changeDocumento(newDoc: string) {
    this.documento.next(newDoc);
  }
  
  // Metodo para modificar la operacion
  changeOperacion(newOpe: string) {
    this.operacion.next(newOpe);
  }

  //Recupera datos generales desde el servidor para alimentar la aplicacion
  getDatosGenerales(): Observable<any> {
    let cpParams = new URLSearchParams();
    let options = new RequestOptions({headers: this.cpHeaders, params: cpParams});
    
   return this.http.get(this.baseURL + 'info/general', options)
    /*return this.http.get('../assets/simulado_job.json')*/
      .map(this.extractData)
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
