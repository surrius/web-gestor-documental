import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Aplicaciones, AppID } from '../clases/aplicaciones';
import { BbddAplicacionesService } from '../services/bbdd-aplicaciones.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-busca-aplicaciones',
  templateUrl: './form-busca-aplicaciones.component.html',
  styleUrls: ['./form-busca-aplicaciones.component.css']
})
export class FormBuscaAplicacionesComponent implements OnInit {
  // Control para visualizar mas o menos campos de búsqueda
  masCampos: boolean = false;
  
  // Variable a la que asociamos como onjeto NgForm, el formulario de búsqueda
  @ViewChild('buscaAppsForm') formulario: NgForm;
  
  //Variable asociada al formulario de búsqueda
  aplicaciones = new Aplicaciones();
  ini_id = {
    cod_aplicaci: null,
    cod_planuuaa: null
  };
  
  // Variables informadas con el servicio de la BBDD de Aplicaciones
  errorMessage: string;
  statusCode: number;
  aplicaciones_res: Aplicaciones[];
  
  //Variables de la tabla de datos
  reorderable: boolean = true;
  selected = [];
 
  constructor(
    private bbddAplicacionesService: BbddAplicacionesService,
    private router: Router
    ) {
    //Se inicializa el objeto interno de la cadena para que no de error TypeError por no estar
    //definida en la template (html) cuando se renderiza la página
    this.aplicaciones.id = this.ini_id;
  }
  
  ngOnInit(): void {
  }
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  // Metodo para el envio del formulario 
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.aplicaciones));
    console.log(this.aplicaciones);
    this.bdBusca(this.aplicaciones);
    this.formulario.control.disable();
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.formulario.control.reset();
    //console.log('Entra en metodo limpiar');    
    //console.log("Los Aplicaciones recuperados son: " + this.aplicaciones_res);
    this.aplicaciones = new Aplicaciones();
    this.aplicaciones.id = this.ini_id;
    this.aplicaciones.id.cod_aplicaci = null;
    this.aplicaciones.id.cod_planuuaa = null;
    this.formulario.control.enable();
  }
  
  /* ****************************************************************** */
  /*  Métodos para las operaciones CRUD con los elementos de las tablas */
  /* ****************************************************************** */
  consulta(row) {
    this.router.navigate(['/form-alta-aplicaciones', row.id]);
  }
  
  elimina(row) {
    if(confirm("Se va a proceder a la eliminacion del registro. ¿Está Seguro?")) {
      console.log(row.id.cod_aplicaci + ' ' + row.id.cod_planuuaa);
      let appID = new AppID();
      appID.cod_aplicaci = row.id.cod_aplicaci;
      appID.cod_planuuaa = row.id.cod_planuuaa;
      
      this.bdBorra(appID);
    }
  }
  
  /* ****************************************************************** */
  /*    Métodos para las operaciones CRUD de invocacion al servicio     */
  /* ****************************************************************** */
  bdBusca(aplicacion: Aplicaciones) {
    this.bbddAplicacionesService.getFindAplicacion(aplicacion).subscribe(
      data => this.aplicaciones_res = data,
      error => this.errorMessage = <any>error);
  }
  
  bdBorra(id: AppID) {
    this.bbddAplicacionesService.deleteAppID(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        console.log('Resultado delete: ' + this.statusCode);
        this.bdBusca(this.aplicaciones);
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
