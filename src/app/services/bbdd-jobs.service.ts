import { Injectable } from '@angular/core';

//M�dulos para comunicacion HTTP
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//M�dulos rxjs
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class BbddJobsService {

  constructor(private _http: Http) {}

}
