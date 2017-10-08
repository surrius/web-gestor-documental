import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

import { Cadenas, Tewokcrds, CdnID } from '../clases/cadenas';
import { BbddCadenasService } from '../services/bbdd-cadenas.service';
import { EnroutadorService } from '../services/enroutador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-alta-cadenas',
  templateUrl: './form-alta-cadenas.component.html',
  styleUrls: ['./form-alta-cadenas.component.css']
})
  
export class FormAltaCadenasComponent implements OnInit {
  //TODO: Quitar, variable de pruebas
  @ViewChild('printPDF') el: ElementRef;
  //TODO: Fin Pruebas
  
  //Variables usadas para rotular el Front de la aplicacion
  titulo: string = '';
  
  //Variebles que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
  //Variable que usaremos para mostrar unicamente partes del html del alta, ya que este formulario
  //se usa también para las consultas.
  public showAlta: boolean = false;
  
  //Variables de informacion de los combos
  periodicidad: any[] = [['D','Diaria'],['S','Semanal'],['M','Mensual'],['T','Trimestral'],['A','Anual']];
  criticidadcdn: any[] = [['N','No cr\u00EDtico'],['A','Alta'],['M','Media'],['B','Baja'],['A','Aviso d\u00EDa siguiente']];
  
  //Variables de validacion del formulario
  datos_ok: boolean = true;
  mensaje_err: string[];
  
  //Variable del tipo Cadenas sobre la que mapear los campos del formulario
  cadenas: Cadenas = new Cadenas();
  
  //Variables de comunicación
  errorMessage: string;
  statusCode: number;
  
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaCadenasForm: FormGroup;

  /* ******************************** */
  /*    Variables para la consulta    */
  /* ******************************** */
  ini_id = {
    cod_aplicaci: null,
    cod_cadenapl: null
  };
  id: any;
  private sub: any;
  
  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el contro del formulario
  constructor(
    private fb: FormBuilder,
    private bbddCadenasService: BbddCadenasService,
    private route: ActivatedRoute,
    private location: Location,
    private data: EnroutadorService
  ) { }

  //Metodo que se ejecutará tras el constructor en el que inicializaremos los campos que va a contener el 
  //formulario. Estos serán los mismos que el de la plantilla HTML, para luego hacer el mapeo con su clase
  ngOnInit() {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
    
    this.crearFormulario();
    
    this.showAlta = this.sw_alta_consulta(this.operacion);
    
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      if (this.id.cod_aplicaci) {
//        console.log('Entra por el IF de consulta y envia...');
        this.cadenas.id = this.ini_id;
        this.cadenas.id.cod_aplicaci = this.id.cod_aplicaci;
        this.cadenas.id.cod_cadenapl = this.id.cod_cadenapl;
        //console.log(this.cadenas);
        this.bdBuscaCadenaId(this.cadenas);
      }
    });
  }
  
  //Metodo que decidirá si se muestran o no las partes del alta
  sw_alta_consulta(oper: string): boolean {
    let resultado: boolean = false;
    switch (oper) {
      case 'alta_nueva':
      case 'alta_copia':
      case 'alta_masiva':
      case 'alta_copia_masiva':
        resultado = true;
        this.titulo = 'Alta de nueva Cadena ';
        break;        
      case 'modificacion':
        resultado = true;
        this.titulo = 'Modificaci\u00F3n de Cadena ';
        break;        
      default:
        this.titulo = 'Consulta de Cadena ';
        resultado = false;
        break;  
    }
    return resultado;
  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                              METODOS USADOS PARA EL ALTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  // Metodo para la creación e inicializacion del formulario
  crearFormulario() {
    this.altaCadenasForm = this.fb.group({
      cod_aplicaci: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      des_refdocum: ['', [Validators.required, Validators.minLength(8)]],
      des_cadenapl: ['', [Validators.required, Validators.minLength(8)]],
      des_autor: [''],
      fec_modifica: [''],
      des_equipocd: [''],
      xti_periocdn: ['', [Validators.required]],
      des_diaejecu: [''],
      des_horaejec: [''],
      xti_critical: ['', [Validators.required]],
      des_rearran: [''],
      des_interrel: [''],
      des_descaden: [''],
      des_incompat: [''],
      relaciones: this.fb.array([this.initRelacion()])
    });
  }
  /*
   * Metodos usados para crear una nueva relacion inicializada, declarando si es 
   * preciso sus validaciones de formulario a tener en cuenta.
   */
  initRelacion(): FormGroup {
    return this.fb.group({
      des_scriptjb: [''],
      des_scriptpr: [''],
      des_cadenapr: [''],
      des_scriptsu: [''],
      des_cadenasu: ['']
    });
  }
  
  //Con el metodo get, se retorna directamente una variable con el nombre del metodo (sin los () ),
  //que tendra el valor del objeto que se retorna. En este caso, retornamos las relaciones
  get relaciones(): FormArray {
    return this.altaCadenasForm.get('relaciones') as FormArray;
  }
  
  //Metodos para añadir una nueva relacion
  addRelacion(): void {
    this.relaciones.push(this.initRelacion());
  }
  
  //Metodos para eliminar una relacion
  removeRelacion(i: number): void {
    this.relaciones.removeAt(i);
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.altaCadenasForm.enable();
    this.crearFormulario();
    //console.log('Entra en metodo limpiar');    
    //console.log("Las Cadenas recuperados son: " + this.cadenas_res);
    this.cadenas = new Cadenas();
    this.cadenas.id = this.ini_id;
    this.cadenas.id.cod_aplicaci = null;
    this.cadenas.id.cod_cadenapl = null;
  }
  
  /* ***************************************************** */
  /* METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB
  /* ***************************************************** */
  onSubmit() {
    this.datos_ok = true;
    this.mensaje_err = [];
    this.cadenas = this.prepareSaveCadena();
    
    if (this.datos_ok) {
      console.log(this.cadenas);
//      console.log('Resultado del formulario de ALTA DE CADENAS: ' + JSON.stringify(this.cadenas));
      
      this.altaNuevaCadena(this.cadenas);
      
    } else {
      alert("Errores al validar el formulario. Corregirlos para continuar");
    } 
  }
  
  prepareSaveCadena(): Cadenas {
    const formModel = this.altaCadenasForm.value;

    // Mapeo manual de los campos del formulario y la clase JobsPrincipal
//    const principalDeepCopy: CadenaPrincipal = {
//      id: {
//        cod_aplicaci: formModel.cod_aplicaci as string,
//        cod_cadenapl:  0   //Sin representacion en el formulario
//      },
//      aud_timcrea: 0,
//      aud_timmodif: 0,
//      aud_usuario: '',
//      cod_autouni: 0,
//      des_refdocum: formModel.des_refdocum as string,
//      des_cadenapl: formModel.des_cadenapl as string,
//      des_autor: formModel.des_autor as string,
//      fec_modifica: formModel.fec_modifica as Date,
//      des_equipocd: formModel.des_equipocd as string,
//      xti_periocdn: formModel.xti_periocdn as string,
//      des_diaejecu: formModel.des_diaejecu as string,
//      des_horaejec: formModel.des_horaejec as string,
//      xti_critical: formModel.xti_critical as string,
//      des_rearran: formModel.des_rearran as string,
//      des_interrel: formModel.des_interrel as string,
//      des_descaden: formModel.des_descaden as string,
//      des_incompat: formModel.des_incompat as string
//    };
    
    // Mapeo automático de los campos del formulario y la clase Tewokcrds
    const relacionesDeepCopy: Tewokcrds[] = formModel.relaciones.map(
      (relaciones: Tewokcrds) => Object.assign({}, relaciones)
    );
    
    // Mapeo manual de la clase Cadenas que une todas las clases que forman la tabla
    if (this.datos_ok) { 
      const saveCadena: Cadenas = {
        id: {
          cod_aplicaci: formModel.cod_aplicaci as string,
          cod_cadenapl: null   //Sin representacion en el formulario
        },
        aud_timcrea: null,
        aud_timmodif: null,
        aud_usuario: null,
        cod_autouni: null,
        des_refdocum: formModel.des_refdocum as string,
        des_cadenapl: formModel.des_cadenapl as string,
        des_autor: formModel.des_autor as string,
        fec_modifica: formModel.fec_modifica as Date,
        des_equipocd: formModel.des_equipocd as string,
        xti_periocdn: formModel.xti_periocdn as string,
        des_diaejecu: formModel.des_diaejecu as string,
        des_horaejec: formModel.des_horaejec as string,
        xti_critical: formModel.xti_critical as string,
        des_rearran: formModel.des_rearran as string,
        des_interrel: formModel.des_interrel as string,
        des_descaden: formModel.des_descaden as string,
        des_incompat: formModel.des_incompat as string,
        tewokcrds: relacionesDeepCopy
      };
      
      return saveCadena;
      
    } else {
      return null;
    }
  }
  
  // Metodo que invoca al servicio para dar de alta una cadena
  altaNuevaCadena(cadena: Cadenas) {
    this.bbddCadenasService.createCadena(cadena)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado Alta Cadena: ' + this.statusCode); //Cod correcto = 201
        this.altaCadenasForm.disable();
        this.showAlta = this.sw_alta_consulta('consulta');
      },
      errorCode => this.statusCode = errorCode
      );
  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                          METODOS USADOS PARA LA CONSULTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  // Metodo para buscar una Cadena por su ID unica en la BBDD y mostrarlo en la Consulta/Modif
  bdBuscaCadenaId(cadena: Cadenas) {
    let cdnID = new CdnID();
    cdnID.cod_aplicaci = cadena.id.cod_aplicaci;
    cdnID.cod_cadenapl = cadena.id.cod_cadenapl;
    
    this.bbddCadenasService.getFindCadenaId(cdnID).subscribe(
      data => this.informaFormulario(data),
      error => { 
        this.errorMessage = <any>error;
        alert('Error al recuperar datos desde el servidor');
        this.goBack();
      }
    );
  }
  
  informaFormulario(data: Cadenas) {
    this.altaCadenasForm.get('cod_aplicaci').setValue(data.id.cod_aplicaci);
    this.altaCadenasForm.get('des_autor').setValue(data.des_autor);
    this.altaCadenasForm.get('des_cadenapl').setValue(data.des_cadenapl);
    this.altaCadenasForm.get('des_descaden').setValue(data.des_descaden);
    this.altaCadenasForm.get('des_diaejecu').setValue(data.des_diaejecu);
    this.altaCadenasForm.get('des_equipocd').setValue(data.des_equipocd);
    this.altaCadenasForm.get('des_horaejec').setValue(data.des_horaejec);
    this.altaCadenasForm.get('des_incompat').setValue(data.des_incompat);
    this.altaCadenasForm.get('des_interrel').setValue(data.des_interrel);
    this.altaCadenasForm.get('des_rearran').setValue(data.des_rearran);
    this.altaCadenasForm.get('des_refdocum').setValue(data.des_refdocum);
    this.altaCadenasForm.get('fec_modifica').setValue(data.fec_modifica);
    this.altaCadenasForm.get('xti_critical').setValue(data.xti_critical);
    this.altaCadenasForm.get('xti_periocdn').setValue(data.xti_periocdn);
    
    // Se informa cada uno de los formArray con los valores recuperados de la BBDD. 
    // Previamente, se elimina el primer registro que se ha creado con el formulario
    // para que no aparezca vacio en la web
    this.relaciones.removeAt(0);
    for (let elem of data.tewokcrds) {
      let formTewokcrds = this.fb.group({
        des_cadenapr: elem.des_cadenapr,
        des_cadenasu: elem.des_cadenasu,
        des_scriptjb: elem.des_scriptjb,
        des_scriptpr: elem.des_scriptpr,
        des_scriptsu: elem.des_scriptsu
      });
      
      this.relaciones.push(formTewokcrds);
    }
    
    // Se desactiva o no el formulario en función de la petición
    this.altaCadenasForm.get('des_cadenapl').disable();
    if (!this.showAlta) {
      this.altaCadenasForm.disable();
    }
        
  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                            METODOS COMUNES USADOS EN EL COMPONENTE                            */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  goBack(): void {
    this.location.back();
  }
  
  download() {
    let pdf = new jsPDF('l', 'pt', 'a4');
    let options = {
      pagesplit: true,
      background: '#fff'
    };  
    
    pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
      pdf.save(this.altaCadenasForm.get('des_cadenapl').value + ".pdf");
    });
  }
  
}
