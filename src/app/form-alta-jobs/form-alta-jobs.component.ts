import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

import { Jobs, Tewokjars, Tewokjcos, Tewokjins, Tewokjsos, TewokjarsAlta, JobID } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';
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
  igualdades: any[] = [['I','Igual'],['D','Distinto']];
  
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
      case 'alta_copia':
      case 'alta_masiva':
      case 'alta_copia_masiva':
        resultado = true;
        this.titulo = 'Alta de nuevo Job ';
        break;        
      case 'modificacion':
        resultado = true;
        this.titulo = 'Modificaci\u00F3n del Job ';
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
      des_refdocjb: ['', [Validators.required, Validators.minLength(8)]],
      des_nombrjob: ['', [Validators.required, Validators.minLength(8)]],
      des_gsoporte: ['', [Validators.required]],
      des_maqori: [''],
      des_libreori: ['', [Validators.required]],
      des_desjobpl: [''],
      des_estrupl: [''],
      des_periojob: [''],
      des_maqeje: [''],
      xti_critijob: ['', [Validators.required]],
      jobsCriticidad: this.fb.array([this.initJobsCriticidad()]),
      pasos1: this.fb.array([this.initPaso1()]),
      pasos2: this.fb.array([this.initPaso2()]),
      pasos3: this.fb.array([this.initPaso3()])
    });
  }
  
  /*
   * Metodos usados para crear un nuevo paso inicializado, declarando si es 
   * preciso sus validaciones de formulario a tener en cuenta.
   */
  initJobsCriticidad(): FormGroup {
    return this.fb.group({
      xti_accion: [''],
      cod_error: [''],
      xti_igualdad: ['']
    });
  }
  
  initPaso1(): FormGroup {
    return this.fb.group({
      des_paso: [''],
      des_fichentr: [''],
      des_fichsali: [''],
      des_entibd: [''],
      des_accesbd: ['']
    });
  }
  
  initPaso2(): FormGroup {
    return this.fb.group({
      des_paso: [''],
      des_predece: [''],
      des_sucesor: [''],
      des_rearra: ['']
    });
  }
  
  initPaso3(): FormGroup {
    return this.fb.group({
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
      //console.log('Resultado del formulario de ALTA DE JOBS: ' + JSON.stringify(this.jobs));
      
      this.altaNuevoJob(this.jobs);
      
    } else {
      alert("Errores al validar el formulario. Corregirlos para continuar");
    } 
  }
  
  prepareSaveJob(): Jobs {
    const formModel = this.altaJobsForm.value;

    // Mapeo automático de los campos del formulario con sus respectivas tablas
    let tewokjarsAlta: TewokjarsAlta[] = formModel.jobsCriticidad.map(
      (jobsCriticidad: TewokjarsAlta) => Object.assign({}, jobsCriticidad)
    ); 
    let jobsCriticidadDeepCopy: Tewokjars[] = this.valida_jobsCriticidadDeepCopy(tewokjarsAlta);
    
    let pasos1DeepCopy: Tewokjsos[] = formModel.pasos1.map(
      (pasos1: Tewokjsos) => Object.assign({}, pasos1)
    );
    
    pasos1DeepCopy = this.valida_pasos1DeepCopy(pasos1DeepCopy);
    
    let pasos2DeepCopy: Tewokjcos[] = formModel.pasos2.map(
      (pasos2: Tewokjcos) => Object.assign({}, pasos2)
    );
    
    pasos2DeepCopy = this.valida_pasos2DeepCopy(pasos2DeepCopy);
    
    let pasos3DeepCopy: Tewokjins[] = formModel.pasos3.map(
      (pasos3: Tewokjins) => Object.assign({}, pasos3)
    );

    pasos3DeepCopy = this.valida_pasos3DeepCopy(pasos3DeepCopy);
    
    // Mapeo manual de la clase Jobs que une todas las clases que forman la tabla de jobs
    if (this.datos_ok) {    
      const saveJob: Jobs = {
        id: {
          cod_aplicaci: formModel.cod_aplicaci as string,
          cod_jobpl: null    //Sin representacion en el formulario
        },
        aud_timcrea: null,   //Sin representacion en el formulario
        aud_timmodif: null,  //Sin representacion en el formulario
        aud_usuario: null,  //Sin representacion en el formulario
        cod_autouni: null,   //Sin representacion en el formulario
        des_refdocjb: formModel.des_refdocjb as string,
        des_nombrjob: formModel.des_nombrjob as string,
        des_gsoporte: formModel.des_gsoporte as string,
        des_maqori: formModel.des_maqori as string,
        des_libreori: formModel.des_libreori as string,
        des_desjobpl: formModel.des_desjobpl as string,
        des_estrupl: formModel.des_estrupl as string,
        des_periojob: formModel.des_periojob as string,
        des_maqeje: formModel.des_maqeje as string,
        xti_critijob: formModel.xti_critijob as string,
        tewokjars: jobsCriticidadDeepCopy,
        tewokjsos: pasos1DeepCopy,
        tewokjcos: pasos2DeepCopy,
        tewokjins: pasos3DeepCopy
      };
      
      return saveJob;
      
    } else {
      return null;
    }
  }
  
  /* ******************************************************** */
  /*     Validaciones previas al envio de datos al servidor   */
  /* ******************************************************** */
  // Dado que los datos del formulario(TewokjarsAlta), no tienen la misma estructura que la clase Tewokjars, 
  // se recorre el array entero y se asignan a una variable con los datos del tipo Tewokjars.
  // De esta manera, al enviar el JSON al Backend, coincide con el que se envia al front para las consultas.
  valida_jobsCriticidadDeepCopy(datos: TewokjarsAlta[]) {
    let array_resultado: Tewokjars[] = new Array<Tewokjars>();
    
    for (let data of datos) {
      let resultado: Tewokjars = new Tewokjars();
      resultado.id = {
        cod_aplicaci: null,
        cod_jobpl: null,
        xti_accion: data.xti_accion,
        cod_error: data.cod_error,
        xti_igualdad: data.xti_igualdad
      };

      if (resultado.id.xti_igualdad != <string>"I" && resultado.id.xti_igualdad != <string>'D') {
        resultado.id.xti_igualdad = 'N';
      }
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  valida_pasos1DeepCopy(datos: Tewokjsos[]) {
    for (let data of datos) {
      let data_pasos1: Tewokjsos = data;
      
      if (!data_pasos1.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la primera tabla.');
      }
    }
    return datos;
  }
  
  valida_pasos2DeepCopy(datos: Tewokjcos[]) {
    for (let data of datos) {
      let data_pasos2: Tewokjcos = data;
      
      if (!data_pasos2.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la segunda tabla.');
      }
    }
    return datos;
  }
  
  valida_pasos3DeepCopy(datos: Tewokjins[]) {
    for (let data of datos) {
      let data_pasos3: Tewokjins = data;
      
      if (!data_pasos3.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la tercera tabla.');
      }
      if (!data_pasos3.xti_critinco) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar nivel de criticidad en la tercera tabla de pasos.');
      }
    }
    return datos;
  }
  
  // Metodo que invoca al servicio para dar de alta un Job
  altaNuevoJob(job: Jobs) {
    this.bbddJobsService.createJob(job)
      .subscribe(successCode => {
        this.statusCode = +successCode;
        console.log('Resultado Alta Job: ' + this.statusCode); //Cod correcto = 201
        this.altaJobsForm.disable();
        this.showAlta = this.sw_alta_consulta('consulta');
      },
      errorCode => this.statusCode = errorCode
      );
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
    this.altaJobsForm.get('cod_aplicaci').setValue(data.id.cod_aplicaci);
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
        xti_accion: elem.id.xti_accion,
        cod_error: elem.id.cod_error,
        xti_igualdad: elem.id.xti_igualdad
      });
      this.jobsCriticidad.push(formTewokjars);
    }
    
    this.pasos1.removeAt(0);
    for (let elem of data.tewokjsos) {
      let formTewokjsos = this.fb.group({
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
        des_paso: elem.des_paso,
        des_incomjob: elem.des_incomjob,
        xti_critinco: elem.xti_critinco
      });
      this.pasos3.push(formTewokjins);
    }
    
    // Se desactiva o no el formulario en función de la petición
    this.altaJobsForm.get('des_nombrjob').disable();
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
  
}
