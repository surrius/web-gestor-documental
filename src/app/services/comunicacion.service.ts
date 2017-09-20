import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ComunicacionService {

  constructor(private _http: Http) {}

  getPosts() {
    // petición por get a esa url de un api rest de pruebas
//    return this._http.get("https://jsonplaceholder.typicode.com/posts")
    return this._http.get("https://my-json-server.typicode.com/surrius/pruebas-data/db")
      .map(res => res.json());
  }

}
