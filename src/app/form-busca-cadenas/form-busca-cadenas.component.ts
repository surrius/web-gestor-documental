import { Component, Input, OnInit } from '@angular/core';

import { CadenaPrincipal, Cadenas } from '../clases/cadenas';
import { BbddCadenasService } from '../services/bbdd-cadenas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-busca-cadenas',
  templateUrl: './form-busca-cadenas.component.html',
  styleUrls: ['./form-busca-cadenas.component.css']
})
  
export class FormBuscaCadenasComponent implements OnInit {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;

  //Variable asociada al formulario de búsqueda
//  cadenas = new CadenaPrincipal();
  cadenas = new Cadenas();
  ini_id = {
      cod_aplicaci: '',
      cod_cadenapl: 0
    };
  
  // Variables informadas con el servicio a la BBDD de cadenas
  // observableCadenas será el objeto Observable que enlazará a la parte front y 
  // cadenas_res, el objeto subscrtito al anterior
  errorMessage: string;
//  observableCadenas: Observable<Cadenas[]>;
  cadenas_res: Cadenas[];
  
  // Variables del plugin Datatables
//  public filterQuery = "";
  public rowsOnPage = 2;
  public sortBy = "email";
  public sortOrder = "asc";

  // Servicio a BBDD
  constructor(private bbddCadenasService: BbddCadenasService) {
    //Se inicializa el objeto interno de la cadena para que no de error TypeError por no estar
    //definida en la template (html) cuando se renderiza la página
    this.cadenas.id = this.ini_id;
  }
  
  ngOnInit(): void {
  }
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));
    console.log(this.cadenas);
    this.bdBusca(this.cadenas);
  }
  
  limpiar() {
    console.log('Entra en metodo limpiar busca-cadenas');
    console.log(this.cadenas_res);
//    this.cadenas = new CadenaPrincipal();
    this.cadenas = new Cadenas();
  }
  
  bdBusca(cadena: Cadenas) {
//    this.observableCadenas = this.bbddCadenasService.getFindCadena();
    this.bbddCadenasService.getFindCadena().subscribe(
      data => this.cadenas_res = data,
      error => this.errorMessage = <any>error);
  }

}
