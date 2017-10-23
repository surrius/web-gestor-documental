import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

import { Jobs, Tewokjars, Tewokjcos, Tewokjins, Tewokjsos, JobID } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';
import { BuscaGrupoSoporteComponent } from '../busca-grupo-soporte/busca-grupo-soporte.component';
import { EnroutadorService } from '../services/enroutador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-alta-jobs',
  templateUrl: './form-alta-jobs.component.html',
  styleUrls: ['./form-alta-jobs.component.css']
})
  
export class FormAltaJobsComponent implements OnInit {
  //TODO: Quitar, variable de pruebas
  grupo_soporte: string[] = ['', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  @ViewChild('printPDF') el: ElementRef;
  //TODO: Fin Pruebas

  // Variable que almacenara el contenido del componente BuscaGrupoSoporteComponent
  @ViewChild(BuscaGrupoSoporteComponent) public buscaGRS: BuscaGrupoSoporteComponent;
  
  //Variables usadas para rotular el Front de la aplicacion
  titulo: string = '';
  
  //Variables que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
  //Variable que usaremos para mostrar unicamente partes del html del alta, ya que este formulario
  //se usa también para las consultas.
  public showAlta: boolean = false;
  
  //Variables para informar los combos 
  criticidad: any[] = [['W','Aviso al d\u00EDa siguiente'],['S','Aviso al d\u00EDa siguiente incluso si es festivo'],['C','Aviso inmediato']];
  acciones: any[] = [['L','Liberar sucesores'],['F','Force OK'],['R','Relanzar']];
  igualdades: any[] = [['I','Igual'],['D','Distinto'],['N','(Vacio)']];
  
  //Variables de validacion del formulario
  datos_ok: boolean = true;
  mensaje_err: string[];
  
  //Variable del tipo Jobs sobre la que mapear los campos del formulario
  jobs: Jobs = new Jobs();
  
  //Variables de comunicación
  errorMessage: string;
  statusCode: number;
  
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaJobsForm: FormGroup;
  
  /* ******************************** */
  /*    Variables para la consulta    */
  /* ******************************** */
  ini_id = {
    cod_aplicaci: null,
    cod_jobpl: null
  };
  id: any;
  private sub: any;

  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el contro del formulario
  constructor(
    private fb: FormBuilder,
    private bbddJobsService: BbddJobsService,
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
        this.jobs.id = this.ini_id;
        this.jobs.id.cod_aplicaci = this.id.cod_aplicaci;
        this.jobs.id.cod_jobpl = this.id.cod_jobpl;
        //console.log(this.jobs);
        this.bdBuscaJobId(this.jobs);
      }
    });
  }
  
  //Metodo que decidirá si se muestran o no las partes del alta
  sw_alta_consulta(oper: string): boolean {
    let resultado: boolean = false;
    switch (oper) {
      case 'alta_nueva':
        resultado = true;
        this.titulo = 'Alta de nuevo Job ';
        break;        
      case 'modificacion':
        resultado = true;
        this.titulo = 'Modificaci\u00F3n del Job ';
        break;  
      case 'copia':
        resultado = true;
        this.titulo = 'Copia de job. Nuevo: ';
        break;       
      default:
        this.titulo = 'Consulta del Job ';
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
    this.altaJobsForm = this.fb.group({
      cod_aplicaci: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cod_jobpl: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_refdocjb: ['', [Validators.required, Validators.minLength(8)]],
      des_nombrjob: ['', [Validators.required, Validators.minLength(8)]],
      des_gsoporte: [''],
      des_maqori: [''],
      des_libreori: ['', [Validators.required]],
      des_desjobpl: [''],
      des_estrupl: [''],
      des_periojob: [''],
      des_maqeje: [''],
      xti_critijob: ['', [Validators.required]],
      jobsCriticidad: this.fb.array([]),
      pasos1: this.fb.array([]),
      pasos2: this.fb.array([]),
      pasos3: this.fb.array([])
//      jobsCriticidad: this.fb.array([this.initJobsCriticidad()]),
//      pasos1: this.fb.array([this.initPaso1()]),
//      pasos2: this.fb.array([this.initPaso2()]),
//      pasos3: this.fb.array([this.initPaso3()])
    });
  }
  
  /*
   * Metodos usados para crear un nuevo paso inicializado, declarando si es 
   * preciso sus validaciones de formulario a tener en cuenta.
   */
  initJobsCriticidad(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_jobpl: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      xti_accion: [''],
      cod_error: [''],
      xti_igualdad: ['']
    });
  }
  
  initPaso1(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_jobpl: [''],
      cod_pasosop: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_paso: [''],
      des_fichentr: [''],
      des_fichsali: [''],
      des_entibd: [''],
      des_accesbd: ['']
    });
  }
  
  initPaso2(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_jobpl: [''],
      cod_pasocond: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_paso: [''],
      des_predece: [''],
      des_sucesor: [''],
      des_rearra: ['']
    });
  }
  
  initPaso3(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_jobpl: [''],
      cod_pasoinc: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_paso: [''],
      des_incomjob: [''],
      xti_critinco: ['']
    });
  }
  
  //Con el metodo get, se retorna directamente una variable con el nombre del metodo (sin los () ),
  //que tendra el valor del objeto que se retorna. En este caso, retornamos los pasos
  get jobsCriticidad(): FormArray {
    return this.altaJobsForm.get('jobsCriticidad') as FormArray;
  }
  
  get pasos1(): FormArray {
    return this.altaJobsForm.get('pasos1') as FormArray;
  }
  
  get pasos2(): FormArray {
    return this.altaJobsForm.get('pasos2') as FormArray;
  }
  
  get pasos3(): FormArray {
    return this.altaJobsForm.get('pasos3') as FormArray;
  }
  
  //Metodos para añadir un nuevo paso
  addJobsCriticidad(): void {
    this.jobsCriticidad.push(this.initJobsCriticidad());
  }
  
  addPaso1(): void {
    this.pasos1.push(this.initPaso1());
  }
  
  addPaso2(): void {
    this.pasos2.push(this.initPaso2());
  }
  
  addPaso3(): void {
    this.pasos3.push(this.initPaso3());
  }
  
  //Metodos para eliminar un paso
  removeJobsCriticidad(x: number): void {
    this.jobsCriticidad.removeAt(x);
  }
  
  removePaso1(i: number): void {
    this.pasos1.removeAt(i);
  }
  
  removePaso2(j: number): void {
    this.pasos2.removeAt(j);
  }
  
  removePaso3(k: number): void {
    this.pasos3.removeAt(k);
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.altaJobsForm.enable();
    this.buscaGRS.seleccionAlta = null;
    this.crearFormulario();
    //console.log('Entra en metodo limpiar');    
    //console.log("Los Jobs recuperados son: " + this.jobs_res);
    this.jobs = new Jobs();
    this.jobs.id = this.ini_id;
    this.jobs.id.cod_aplicaci = null;
    this.jobs.id.cod_jobpl = null;
  }
  
  /* ***************************************************** */
  /*    METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB     */
  /* ***************************************************** */
  onSubmit() {
    this.datos_ok = true;
    this.mensaje_err = [];
    this.jobs = this.prepareSaveJob();
    
    if (this.datos_ok) {
      console.log(this.jobs);
      console.log('Resultado del formulario de ALTA DE JOBS: ' + JSON.stringify(this.jobs));
      
      switch (this.operacion) {
        case "modificacion":
          this.modificaJob(this.jobs);
          break;
        case "copia":
          this.altaNuevoJob(this.jobs);
          break;        
        default: //alta
          this.altaJobsForm.get('des_gsoporte').setValue(this.buscaGRS.seleccionAlta);
          this.altaNuevoJob(this.jobs);
          break;
      }

      /*if (this.operacion == 'modificacion') {
        this.modificaJob(this.jobs);
      } else {
        this.altaJobsForm.get('des_gsoporte').setValue(this.buscaGRS.seleccionAlta);
        this.altaNuevoJob(this.jobs);
      }*/
      
    } else {
      alert("Errores al validar el formulario. Corregirlos para continuar");
    } 
  }
  
  prepareSaveJob(): Jobs {
    const formModel = this.altaJobsForm.value;

    // Mapeo automático de los campos del formulario con sus respectivas tablas
//    let tewokjarsAlta: TewokjarsAlta[] = formModel.jobsCriticidad.map(
//      (jobsCriticidad: TewokjarsAlta) => Object.assign({}, jobsCriticidad)
//    ); 
//    let jobsCriticidadDeepCopy: Tewokjars[] = this.valida_jobsCriticidadDeepCopy(tewokjarsAlta);
    let jobsCriticidadDeepCopy: Tewokjars[] = this.validarCriticidad(formModel.jobsCriticidad);
    
//    let pasos1DeepCopy: Tewokjsos[] = formModel.pasos1.map(
//      (pasos1: Tewokjsos) => Object.assign({}, pasos1)
//    );
    
//    pasos1DeepCopy = this.valida_pasos1DeepCopy(pasos1DeepCopy);
    let pasos1DeepCopy: Tewokjsos[] = this.validarPasos1(formModel.pasos1);
    
    
//    let pasos2DeepCopy: Tewokjcos[] = formModel.pasos2.map(
//      (pasos2: Tewokjcos) => Object.assign({}, pasos2)
//    );
//    
//    pasos2DeepCopy = this.valida_pasos2DeepCopy(pasos2DeepCopy);
    let pasos2DeepCopy: Tewokjcos[] = this.validarPasos2(formModel.pasos2);
    
//    let pasos3DeepCopy: Tewokjins[] = formModel.pasos3.map(
//      (pasos3: Tewokjins) => Object.assign({}, pasos3)
//    );
//
//    pasos3DeepCopy = this.valida_pasos3DeepCopy(pasos3DeepCopy);
    let pasos3DeepCopy: Tewokjins[] = this.validarPasos3(formModel.pasos3);
    
    // Mapeo manual de la clase Jobs que une todas las clases que forman la tabla de jobs
    if (this.datos_ok) {    
      const saveJob: Jobs = {
        id: {
          cod_aplicaci: formModel.cod_aplicaci? formModel.cod_aplicaci as string : null,
          cod_jobpl: formModel.cod_jobpl? formModel.cod_jobpl as number : null
        },
        aud_timcrea: formModel.aud_timcrea? formModel.aud_timcrea as number : null,
        aud_timmodif: formModel.aud_timmodif? formModel.aud_timmodif as number : null,
        aud_usuario: formModel.aud_usuario? formModel.aud_usuario as string : null,
        cod_autouni: formModel.cod_autouni? formModel.cod_autouni as number : null,
        
        des_refdocjb: formModel.des_refdocjb? formModel.des_refdocjb as string : null,
        des_nombrjob: formModel.des_nombrjob? formModel.des_nombrjob as string : null,
        des_gsoporte: formModel.des_gsoporte? formModel.des_gsoporte as string : null,
        des_maqori: formModel.des_maqori? formModel.des_maqori as string : null,
        des_libreori: formModel.des_libreori? formModel.des_libreori as string : null,
        des_desjobpl: formModel.des_desjobpl? formModel.des_desjobpl as string : null,
        des_estrupl: formModel.des_estrupl? formModel.des_estrupl as string : null,
        des_periojob: formModel.des_periojob? formModel.des_periojob as string : null,
        des_maqeje: formModel.des_maqeje? formModel.des_maqeje as string : null,
        xti_critijob: formModel.xti_critijob? formModel.xti_critijob as string : null,
        tewokjars: jobsCriticidadDeepCopy,
        tewokjsos: pasos1DeepCopy,
        tewokjcos: pasos2DeepCopy,
        tewokjins: pasos3DeepCopy
      };
      
      
      if (!saveJob.des_gsoporte) {
        this.datos_ok = false;
        this.mensaje_err.push('- No ha seleccionado ning\u00FAn Grupo de Soporte');
      }

      return saveJob;

    } else {
      return null;
    }
  }
  
  /* ******************************************************** */
  /*     Validaciones previas al envio de datos al servidor   */
  /* ******************************************************** */
  // Dado que los datos del formulario, no tienen la misma estructura que la clase Tewokjars, 
  // se recorre el array entero y se asignan a una variable con los datos del tipo Tewokjars.
  // De esta manera, componemos el JSON que espera recibir el backend con la estructura de las tablas SQL.
  validarCriticidad(form: any) {
    let array_resultado: Tewokjars[] = new Array<Tewokjars>();
    
    for (let elem of form) {
      let resultado: Tewokjars = new Tewokjars();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_jobpl: elem.cod_jobpl? elem.cod_jobpl : null,
        xti_accion: elem.xti_accion? elem.xti_accion : null,
        cod_error: elem.cod_error? elem.cod_error : null,
        xti_igualdad: elem.xti_igualdad? elem.xti_igualdad : null
      };
      
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      if (resultado.id.xti_igualdad != <string>"I" && resultado.id.xti_igualdad != <string>'D') {
        resultado.id.xti_igualdad = 'N';
      }
      if (!resultado.id.cod_error) {
        resultado.id.cod_error = 0;
      }
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
//  valida_jobsCriticidadDeepCopy(datos: TewokjarsAlta[]) {
//    let array_resultado: Tewokjars[] = new Array<Tewokjars>();
//    
//    for (let data of datos) {
//      let resultado: Tewokjars = new Tewokjars();
//      resultado.id = {
//        cod_aplicaci: null,
//        cod_jobpl: null,
//        xti_accion: data.xti_accion,
//        cod_error: data.cod_error,
//        xti_igualdad: data.xti_igualdad
//      };
//
//      if (resultado.id.xti_igualdad != <string>"I" && resultado.id.xti_igualdad != <string>'D') {
//        resultado.id.xti_igualdad = 'N';
//      }
//      
//      array_resultado.push(resultado);
//    }
//    
//    return array_resultado;
//  }
  
  validarPasos1(form: any) {
    let array_resultado: Tewokjsos[] = new Array<Tewokjsos>();
    
    for (let elem of form) {
      let resultado: Tewokjsos = new Tewokjsos();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_jobpl: elem.cod_jobpl? elem.cod_jobpl : null,
        cod_pasosop: elem.cod_pasosop? elem.cod_pasosop : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_accesbd = elem.des_accesbd? elem.des_accesbd : null;
      resultado.des_entibd = elem.des_entibd? elem.des_entibd : null;
      resultado.des_fichentr = elem.des_fichentr? elem.des_fichentr : null;
      resultado.des_fichsali = elem.des_fichsali? elem.des_fichsali : null;
      resultado.des_paso = elem.des_paso? elem.des_paso : null;
      
      if (!resultado.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la primera tabla de descripcion de pasos.');
      }
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarPasos2(form: any) {
    let array_resultado: Tewokjcos[] = new Array<Tewokjcos>();
    
    for (let elem of form) {
      let resultado: Tewokjcos = new Tewokjcos();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_jobpl: elem.cod_jobpl? elem.cod_jobpl : null,
        cod_pasocond: elem.cod_pasocond? elem.cod_pasocond : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_paso = elem.des_paso? elem.des_paso : null;
      resultado.des_predece = elem.des_predece? elem.des_predece : null;
      resultado.des_rearra = elem.des_rearra? elem.des_rearra : null;
      resultado.des_sucesor = elem.des_sucesor? elem.des_sucesor : null;
      
      if (!resultado.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la segunda tabla de descripcion de pasos.');
      }
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarPasos3(form: any) {
    let array_resultado: Tewokjins[] = new Array<Tewokjins>();
    
    for (let elem of form) {
      let resultado: Tewokjins = new Tewokjins();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_jobpl: elem.cod_jobpl? elem.cod_jobpl : null,
        cod_pasoinc: elem.cod_pasoinc? elem.cod_pasoinc : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_paso = elem.des_paso? elem.des_paso : null;
      resultado.des_incomjob = elem.des_incomjob? elem.des_incomjob : null;
      resultado.xti_critinco = elem.xti_critinco? elem.xti_critinco : null;
      
      if (!resultado.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la tercera tabla de descripcion de pasos.');
      }
      if (!resultado.xti_critinco) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar nivel de criticidad en la tercera tabla de descripcion de pasos.');
      }
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
//  valida_pasos1DeepCopy(datos: Tewokjsos[]) {
//    for (let data of datos) {
//      let data_pasos1: Tewokjsos = data;
//      
//      if (!data_pasos1.des_paso) {
//        this.datos_ok = false;
//        this.mensaje_err.push('- Falta por informar paso en la primera tabla.');
//      }
//    }
//    return datos;
//  }
  
//  valida_pasos2DeepCopy(datos: Tewokjcos[]) {
//    for (let data of datos) {
//      let data_pasos2: Tewokjcos = data;
//      
//      if (!data_pasos2.des_paso) {
//        this.datos_ok = false;
//        this.mensaje_err.push('- Falta por informar paso en la segunda tabla de descripcion de pasos.');
//      }
//    }
//    return datos;
//  }
  
//  valida_pasos3DeepCopy(datos: Tewokjins[]) {
//    for (let data of datos) {
//      let data_pasos3: Tewokjins = data;
//      
//      if (!data_pasos3.des_paso) {
//        this.datos_ok = false;
//        this.mensaje_err.push('- Falta por informar paso en la tercera tabla de descripcion de pasos.');
//      }
//      if (!data_pasos3.xti_critinco) {
//        this.datos_ok = false;
//        this.mensaje_err.push('- Falta por informar nivel de criticidad en la tercera tabla de descripcion de pasos.');
//      }
//    }
//    return datos;
//  }
  
  // Metodo que invoca al servicio para dar de alta un Job
  altaNuevoJob(job: Jobs) {
    this.bbddJobsService.createJob(job)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado Alta Job: ' + this.statusCode); //Cod correcto = 201
        alert('Alta efectuada correctamente');
        this.altaJobsForm.disable();
        this.showAlta = this.sw_alta_consulta('consulta');
      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error al solicitar el alta.');      
      });
  }
  
  // Metodo que invoca al servicio para dar de modificar un Job
  modificaJob(job: Jobs) {
    this.bbddJobsService.updateJob(job)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado Modificacion Job: ' + this.statusCode); //Cod correcto = 201
        alert('Job modificado correctamente');
        this.altaJobsForm.disable();
        this.showAlta = this.sw_alta_consulta('consulta');
      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error al modificar job.');      
      });
  }

  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                    METODOS USADOS PARA LA CONSULTA Y MODIFICACION DE DATOS                    */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  // Metodo para buscar un Job por su ID unica en la BBDD y mostrarlo en la Consulta/Modif
  bdBuscaJobId(job: Jobs) {
    let jobID = new JobID();
    jobID.cod_aplicaci = job.id.cod_aplicaci;
    jobID.cod_jobpl = job.id.cod_jobpl;
    
    this.bbddJobsService.getFindJobId(jobID).subscribe(
      data => this.informaFormulario(data),
      error => { 
        this.errorMessage = <any>error;
        alert('Error al recuperar datos desde el servidor');
        this.goBack();
      }
    );
  }
  
  informaFormulario(data: Jobs) {
    if (this.operacion == 'copia') {
      data.id.cod_jobpl = null;
      data.aud_timcrea = null;
      data.aud_timmodif = null;
      data.aud_usuario = null;
      data.cod_autouni = null;
      data.des_refdocjb = null;
      data.des_nombrjob = null;
    }

    this.altaJobsForm.get('cod_aplicaci').setValue(data.id.cod_aplicaci);
    this.altaJobsForm.get('cod_jobpl').setValue(data.id.cod_jobpl);
    this.altaJobsForm.get('aud_timcrea').setValue(data.aud_timcrea);
    this.altaJobsForm.get('aud_timmodif').setValue(data.aud_timmodif);
    this.altaJobsForm.get('aud_usuario').setValue(data.aud_usuario);
    this.altaJobsForm.get('cod_autouni').setValue(data.cod_autouni);
    
    this.altaJobsForm.get('des_refdocjb').setValue(data.des_refdocjb);
    this.altaJobsForm.get('des_nombrjob').setValue(data.des_nombrjob);
    this.altaJobsForm.get('des_gsoporte').setValue(data.des_gsoporte);
    this.altaJobsForm.get('des_maqori').setValue(data.des_maqori);
    this.altaJobsForm.get('des_libreori').setValue(data.des_libreori);
    this.altaJobsForm.get('des_desjobpl').setValue(data.des_desjobpl);
    this.altaJobsForm.get('des_estrupl').setValue(data.des_estrupl);
    this.altaJobsForm.get('des_periojob').setValue(data.des_periojob);
    this.altaJobsForm.get('des_maqeje').setValue(data.des_maqeje);
    this.altaJobsForm.get('xti_critijob').setValue(data.xti_critijob);
    
    // Se informa cada uno de los formArray con los valores recuperados de la BBDD. 
    // Previamente, se elimina el primer registro que se ha creado con el formulario
    // para que no aparezca vacio en la web
    this.jobsCriticidad.removeAt(0);
    for (let elem of data.tewokjars) {
      let formTewokjars = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_jobpl: elem.id.cod_jobpl,
        xti_accion: elem.id.xti_accion,
        cod_error: elem.id.cod_error,
        xti_igualdad: elem.id.xti_igualdad,
        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni
        
      });
      this.jobsCriticidad.push(formTewokjars);
    }
    
    this.pasos1.removeAt(0);
    for (let elem of data.tewokjsos) {
      let formTewokjsos = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_jobpl: elem.id.cod_jobpl,
        cod_pasosop: elem.id.cod_pasosop,
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
      
        des_paso: elem.des_paso,
        des_fichentr: elem.des_fichentr,
        des_fichsali: elem.des_fichsali,
        des_entibd: elem.des_entibd,
        des_accesbd: elem.des_accesbd
      });
      this.pasos1.push(formTewokjsos);
    }
    
    this.pasos2.removeAt(0);
    for (let elem of data.tewokjcos) {
      let formTewokjcos = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_jobpl: elem.id.cod_jobpl,
        cod_pasocond: elem.id.cod_pasocond,
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_paso: elem.des_paso,
        des_predece: elem.des_predece,
        des_sucesor: elem.des_sucesor,
        des_rearra: elem.des_rearra
      });
      this.pasos2.push(formTewokjcos);
    }
    
    this.pasos3.removeAt(0);
    for (let elem of data.tewokjins) {
      let formTewokjins = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_jobpl: elem.id.cod_jobpl,
        cod_pasoinc: elem.id.cod_pasoinc,
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_paso: elem.des_paso,
        des_incomjob: elem.des_incomjob,
        xti_critinco: elem.xti_critinco
      });
      this.pasos3.push(formTewokjins);
    }
    
    // Se desactiva o no el formulario en función de la petición
//    this.altaJobsForm.get('des_nombrjob').disable();
    if (!this.showAlta) {
      this.altaJobsForm.disable();
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
      pdf.save(this.altaJobsForm.get('des_refdocjb').value + ".pdf");
    });
  }

  setOrigen(info: string) {
    this.buscaGRS.seleccion = '';
    this.buscaGRS.origen = info;
  } 
  
}
