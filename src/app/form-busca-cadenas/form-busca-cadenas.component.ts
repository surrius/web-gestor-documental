import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Cadenas, CdnID } from '../clases/cadenas';
import { BbddCadenasService } from '../services/bbdd-cadenas.service';
import { EnroutadorService } from '../services/enroutador.service';
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
  mostrarCampos = false;

  //Campos visualizables en la busqueda de la tabla
  chk_nomCadena: boolean = true;
  chk_uuaa: boolean = false;
  chk_autor: boolean = true;
  chk_fecModif: boolean = true;
  chk_equipo: boolean = true;
  chk_periodicidad: boolean = true;
  chk_diaEjecucion: boolean = true;
  chk_horario: boolean = true;
  chk_criticidad: boolean = true;
  chk_rearranques: boolean = true;
  chk_interOnline: boolean = true;

  // Variable a la que asociamos como onjeto NgForm, el formulario de búsqueda
  @ViewChild('buscaCdnForm') formulario: NgForm;

  //Variables que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
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
    private router: Router,
    private data: EnroutadorService
  ) {
    //Se inicializa el objeto interno de la cadena para que no de error TypeError por no estar
    //definida en la template (html) cuando se renderiza la página
    this.cadenas.id = this.ini_id;
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
    console.log('ha pulsado en submit busca-cadenas: ' + JSON.stringify(this.cadenas));
    console.log(this.cadenas);
    this.bdBusca(this.cadenas);
    /*this.formulario.control.disable();*/
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

  borradoMasivo() {
    if (confirm("Se van a eliminar varias cadenas masivamente. ¿Proceder?")) {
      class ElemBorra {
        cadenas: CdnID[];
      }
      
      let elemBorra = new ElemBorra();

      let array_cadenas: CdnID[] = new Array<CdnID>();

      for (let data of this.selected) {
        let cdnID = new CdnID();
        cdnID.cod_aplicaci = data.id.cod_aplicaci;
        cdnID.cod_cadenapl = data.id.cod_cadenapl;
        array_cadenas.push(cdnID);
      }

      elemBorra.cadenas = array_cadenas;

      console.log(JSON.stringify(elemBorra));
      this.borradoMasivoCadena(elemBorra);
    }
  }
  
  /* ****************************************************************** */
  /*  Métodos para las operaciones CRUD con los elementos de las tablas */
  /* ****************************************************************** */
  consulta(row) {
    this.operacion = 'consulta';
    this.data.changeOperacion(this.operacion);
    this.router.navigate(['/form-alta-cadenas', row.id]);
  }

  modificacion(row) {
    this.operacion = 'modificacion';
    this.data.changeOperacion(this.operacion);
    this.router.navigate(['/form-alta-cadenas', row.id]);
  }

  copiar(row) {
    this.operacion = 'copia';
    this.data.changeOperacion(this.operacion);
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
  
  borradoMasivoCadena(elemBorra) {
    this.bbddCadenasService.deleteMasivo(elemBorra)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado borrado masivo Cadenas: ' + this.statusCode); //Cod correcto = 201
        alert('Cadenas eliminadas correctamente');
        this.bdBusca(this.cadenas);

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