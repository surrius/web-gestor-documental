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
  // Control para visualizar mas o menos campos de b˙squeda
  masCampos: boolean = false;

  //Variable asociada al formulario de b˙squeda
  cadenas = new CadenaPrincipal();
  
  //TODO: Var de pruebas
  data_simu = 
  [
  {
    "id": {
      "cod_aplicaci": "DIME",
      "cod_cadenapl": 1
    },
    "aud_timcrea": 1506330871982,
    "aud_timmodif": 1506330871982,
    "aud_usuario": "XE29079",
    "cod_autouni": 1,
    "des_autor": "autor",
    "des_cadenapl": "CADENA_APLICA",
    "des_descaden": "Observaciones de la cadena",
    "des_diaejecu": "Todos los d√≠as laborables",
    "des_equipocd": "SIDBS101",
    "des_horaejec": "Cada 5 min",
    "des_incompat": "Incompatibilidades encontradas",
    "des_interrel": "Relaciones con otras cadenas",
    "des_rearran": "Rearranques necesarios tras la ejecuci√≥n",
    "des_refdocum": "DIMEJOBA.doc",
    "fec_modifica": null,
    "xti_critical": "B",
    "xti_periocdn": "D",
    "tewokcrds": [
      {
        "id": {
          "cod_aplicaci": "DIME",
          "cod_cadenapl": 1,
          "cod_secuuaa": 1
        },
        "aud_timcrea": 1506437930427,
        "aud_timmodif": 1506437930427,
        "aud_usuario": "XE29079",
        "cod_autouni": 1,
        "des_cadenapr": "Cadena Predecesor",
        "des_cadenasu": "Cadena Sucesor",
        "des_scriptjb": "Script ejecutado",
        "des_scriptpr": "Script del predecesor",
        "des_scriptsu": "Script del sucesor"
      },
      {
        "id": {
          "cod_aplicaci": "DIME",
          "cod_cadenapl": 1,
          "cod_secuuaa": 2
        },
        "aud_timcrea": 1506438054226,
        "aud_timmodif": 1506438054226,
        "aud_usuario": "XE20856",
        "cod_autouni": 2,
        "des_cadenapr": "Nuevo Predecesor",
        "des_cadenasu": "Nuevo Sucesor",
        "des_scriptjb": "Datos de ejecutado",
        "des_scriptpr": "Datos de predecesor",
        "des_scriptsu": "Datos de sucesor"
      }
    ]
  },
  {
    "id": {
      "cod_aplicaci": "SIUL",
      "cod_cadenapl": 2
    },
    "aud_timcrea": 1506332968146,
    "aud_timmodif": 1506332968146,
    "aud_usuario": "XE29079",
    "cod_autouni": 3,
    "des_autor": "autor",
    "des_cadenapl": "CADENA_APLICA",
    "des_descaden": "Observaciones de la cadena",
    "des_diaejecu": "Todos los d√≠as laborables",
    "des_equipocd": "SIDBS101",
    "des_horaejec": "Cada 5 min",
    "des_incompat": "Incompatibilidades encontradas",
    "des_interrel": "Relaciones con otras cadenas",
    "des_rearran": "Rearranques necesarios tras la ejecuci√≥n",
    "des_refdocum": "DIMEJOBA.doc",
    "fec_modifica": null,
    "xti_critical": "B",
    "xti_periocdn": "D",
    "tewokcrds": []
  },
  {
    "id": {
      "cod_aplicaci": "SIUL",
      "cod_cadenapl": 1
    },
    "aud_timcrea": 1506348254860,
    "aud_timmodif": 1506348254860,
    "aud_usuario": "XE29079",
    "cod_autouni": 2,
    "des_autor": "autor",
    "des_cadenapl": "CADENA_APLICA",
    "des_descaden": "Observaciones de la cadena",
    "des_diaejecu": "Todos los d√≠as laborables",
    "des_equipocd": "SDDIM110",
    "des_horaejec": "Cada 5 min",
    "des_incompat": "Incompatibilidades encontradas",
    "des_interrel": "Relaciones con otras cadenas",
    "des_rearran": "Rearranques necesarios tras la ejecuci√≥n",
    "des_refdocum": "DIMEJOBA.doc",
    "fec_modifica": null,
    "xti_critical": "B",
    "xti_periocdn": "D",
    "tewokcrds": []
  }
];
  //TODO: Var de pruebas - Fin
  
  // Variables informadas con el servicio a la BBDD de cadenas
  // observableCadenas ser· el objeto Observable que enlazar· a la parte front y 
  // cadenas_res, el objeto subscrtito al anterior
  errorMessage: string;
  observableCadenas: Observable<Cadenas[]>;
  cadenas_res: Cadenas[];
  
  // Variables del plugin Datatables
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  // Servicio a BBDD
  constructor(private bbddCadenasService: BbddCadenasService) {}
  
  ngOnInit(): void {
    this.observableCadenas = this.bbddCadenasService.getUltimas();
    this.observableCadenas.subscribe(
      data => this.cadenas_res = data,
      error => this.errorMessage = <any>error);
  }
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  public onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar busca-cadenas');
    console.log(this.cadenas_res);
    this.cadenas = new CadenaPrincipal();
  }

}
