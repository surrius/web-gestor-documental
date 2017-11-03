import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Aplicaciones, AppID } from '../clases/aplicaciones';
import { BbddAplicacionesService } from '../services/bbdd-aplicaciones.service';
import { EnroutadorService } from '../services/enroutador.service';
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
  mostrarCampos = false;

  //Campos visualizables en la busqueda de la tabla
  chk_uuaa: boolean = true;
  chk_nomdoc: boolean = false;
  chk_monitorizacion: boolean = true;
  chk_fecMonitoriza: boolean = true;
  chk_horasMaxAcceso: boolean = true;
  chk_fecImplanta: boolean = true;
  chk_fecEntrega: boolean = true;
  chk_horasValle: boolean = false;
  chk_fecPrevEntrega: boolean = false;
  chk_nomPeti: boolean = true;
  chk_telPeti: boolean = false;
  chk_sancion: boolean = false;
  chk_fecUltSol: boolean = true;
  chk_fecFinRA: boolean = true;
  chk_usuRA: boolean = true;
  chk_responsableRA: boolean = true;
  chk_telResponsableRA: boolean = false;
  chk_alcPaquetes: boolean = false;
  chk_alcScripts: boolean = false;
  chk_alcFicConf: boolean = false;
  chk_alcBBDD: boolean = false;

  // Variable a la que asociamos como onjeto NgForm, el formulario de búsqueda
  @ViewChild('buscaAppsForm') formulario: NgForm;

  //Variables que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
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
    private router: Router,
    private data: EnroutadorService
    ) {
    //Se inicializa el objeto interno de la cadena para que no de error TypeError por no estar
    //definida en la template (html) cuando se renderiza la página
    this.aplicaciones.id = this.ini_id;
  }
  
  ngOnInit(): void {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
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
    /*this.formulario.control.disable();*/
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

  borradoMasivo() {
    if (confirm("Se van a eliminar varias aplicaciones masivamente. ¿Proceder?")) {
      class ElemBorra {
        aplicaciones: AppID[];
      }
      let elemBorra = new ElemBorra();

      let array_aplicaciones: AppID[] = new Array<AppID>();

      for (let data of this.selected) {
        let appID = new AppID();
        appID.cod_aplicaci = data.id.cod_aplicaci;
        appID.cod_planuuaa = data.id.cod_planuuaa;
        array_aplicaciones.push(appID);
      }

      elemBorra.aplicaciones = array_aplicaciones;

      console.log(JSON.stringify(elemBorra));
      this.borradoMasivoAplicaciones(elemBorra);
    }
  }
  
  /* ****************************************************************** */
  /*  Métodos para las operaciones CRUD con los elementos de las tablas */
  /* ****************************************************************** */
  consulta(row) {
    this.operacion = 'consulta';
    this.data.changeOperacion(this.operacion);
    this.router.navigate(['/form-alta-aplicaciones', row.id]);
  }

  modificacion(row) {
    this.operacion = 'modificacion';
    this.data.changeOperacion(this.operacion);
    this.router.navigate(['/form-alta-aplicaciones', row.id]);
  }
  
  copiar(row) {
    this.operacion = 'copia';
    this.data.changeOperacion(this.operacion);
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

  borradoMasivoAplicaciones(elemBorra) {
    this.bbddAplicacionesService.deleteMasivo(elemBorra)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado borrado masivo Aplicaciones: ' + this.statusCode); //Cod correcto = 201
        alert('Aplicaciones eliminadas correctamente');
        this.bdBusca(this.aplicaciones);

      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error en servidor al borrar masivamente.');      
      });
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

  toggleMostrarCampos() {
    this.mostrarCampos = !this.mostrarCampos;
  }


}
