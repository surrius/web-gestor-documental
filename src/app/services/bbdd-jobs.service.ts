import { Injectable } from '@angular/core';

//Módulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//Módulos rxjs
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class BbddJobsService {

  constructor(private _http: Http) {}

}
