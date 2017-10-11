import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Cadenas, CdnID } from '../clases/cadenas';
import { BbddCadenasService } from '../services/bbdd-cadenas.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-busca-cadenas',
  templateUrl: './form-busca-cadenas.component.html',
  styleUrls: ['./form-busca-cadenas.component.css']
})
  
export class FormBuscaCadenasComponent implements OnInit {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;

  // Variable a la que asociamos como onjeto NgForm, el formulario de búsqueda
  @ViewChild('buscaCdnForm') formulario: NgForm;
  
  //Variable asociada al formulario de búsqueda
//  cadenas = new CadenaPrincipal();
  cadenas = new Cadenas();
  ini_id = {
      cod_aplicaci: null,
      cod_cadenapl: null
    };
  
  // Variables informadas con el servicio a la BBDD de cadenas
  errorMessage: string;
  statusCode: number;
  cadenas_res: Cadenas[];
  
  //Variables de la tabla de datos
  reorderable: boolean = true;
  selected = [];
  
  constructor(
    private bbddCadenasService: BbddCadenasService,
    private router: Router
  ) {
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
  
  // Metodo para el envio del formulario
  public onSubmit() {
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));
    console.log(this.cadenas);
    this.bdBusca(this.cadenas);
    this.formulario.control.disable();
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.formulario.control.reset();
    //console.log('Entra en metodo limpiar');    
    //console.log("Los Jobs recuperados son: " + this.jobs_res);
    this.cadenas = new Cadenas();
    this.cadenas.id = this.ini_id;
    this.cadenas.id.cod_aplicaci = null;
    this.cadenas.id.cod_cadenapl = null;
    this.formulario.control.enable();
  }
  
  /* ****************************************************************** */
  /*  Métodos para las operaciones CRUD con los elementos de las tablas */
  /* ****************************************************************** */
  consulta(row) {
    this.router.navigate(['/form-alta-cadenas', row.id]);
  }
  
  elimina(row) {
    if(confirm("Se va a proceder a la eliminacion del registro. ¿Está Seguro?")) {
      console.log(row.id.cod_aplicaci + ' ' + row.id.cod_cadenapl);
      let cadenaID = new CdnID();
      cadenaID.cod_aplicaci = row.id.cod_aplicaci;
      cadenaID.cod_cadenapl = row.id.cod_cadenapl;
      
      this.bdBorra(cadenaID);
    }
  }
  
  /* ****************************************************************** */
  /*    Métodos para las operaciones CRUD de invocacion al servicio     */
  /* ****************************************************************** */
  bdBusca(cadena: Cadenas) {
    this.bbddCadenasService.getFindCadena(cadena).subscribe(
      data => this.cadenas_res = data,
      error => this.errorMessage = <any>error);
  }
  
  bdBorra(id: CdnID) {
    this.bbddCadenasService.deleteCdnID(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        console.log('Resultado delete: ' + this.statusCode);
        this.bdBusca(this.cadenas);
      },
      errorCode => this.statusCode = errorCode
      );
  }
  
  /* ****************************************************************** */
  /*            Métodos de operacion con el plugin de tablas            */
  /* ****************************************************************** */
  onSelect({selected}) {
    //console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

}