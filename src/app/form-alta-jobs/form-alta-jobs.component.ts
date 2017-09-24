import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

import { JobsPrincipal, JobsCriticidad, JobsPasos1, JobsPasos2, JobsPasos3, Jobs } from '../clases/jobs';
import { EnroutadorService } from '../services/enroutador.service';

@Component({
  selector: 'app-form-alta-jobs',
  templateUrl: './form-alta-jobs.component.html',
  styleUrls: ['./form-alta-jobs.component.css']
})
  
export class FormAltaJobsComponent implements OnInit {
  //TODO: Quitar, variable de pruebas
  grupo_soporte: string[] = ['', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  pruebaForm: string =  '{ "cod_aplicaci": "kkkk", "des_refdocjb": "bbbbbbbbbbbbbbbbbb", "des_nombrjob": "aaaaaaaaa" }';  
  obj = JSON.parse(this.pruebaForm);
  //TODO: Fin Pruebas
  
  //Variebles que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
  //Variable que usaremos para mostrar unicamente partes del html del alta, ya que este formulario
  //se usa también para las consultas.
  public showAlta: boolean = false;
  
  //Variables para informar los combos de criticidad
  criticidad: any[] = [['W','Aviso al d&iacute;a siguiente'],['S','Aviso al d&iacute;a siguiente incluso si es festivo'],['C','Aviso inmediato']];
  acciones: any[] = [['L','Liberar sucesores'],['F','Force OK'],['R','Relanzar']];
  igualdades: any[] = [['I','Igual'],['D','Distinto']];
  
  //Variables de validacion del formulario
  datos_ok: boolean = true;
  mensaje_err: string[];
  
  //Variable del tipo Jobs sobre la que mapear los campos del formulario
  jobs: Jobs = new Jobs();
  
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaJobsForm: FormGroup;

  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el contro del formulario
  constructor(
    private fb: FormBuilder,
    private data: EnroutadorService
  ) { }

  //Metodo que se ejecutará tras el constructor en el que inicializaremos los campos que va a contener el 
  //formulario. Estos serán los mismos que el de la plantilla HTML, para luego hacer el mapeo con su clase
  ngOnInit() {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
    
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
    
    this.showAlta = this.sw_alta_consulta(this.operacion);
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
        break;        
      default:
        resultado = false;
        break;  
    }
    
    if(resultado) {
      this.altaJobsForm.enable();
    } else {
      this.altaJobsForm.disable();
    }
    return resultado;
  }
  
  //TODO: Metodo de pruebas
  prueba () {
    console.log('Hola: ' + this.obj.des_refdocjb);
    this.altaJobsForm.get('des_refdocjb').setValue(this.obj.des_refdocjb);
    this.altaJobsForm.get('cod_aplicaci').setValue(this.obj.cod_aplicaci);
    this.altaJobsForm.get('des_nombrjob').setValue(this.obj.des_nombrjob);
  }
  //TODO: Metodo de pruebas-fin
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                              METODOS USADOS PARA EL ALTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */

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
  
  /* ***************************************************** */
  /* METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB
  /* ***************************************************** */
  onSubmit() {
    this.datos_ok = true;
    this.mensaje_err = [];
    this.jobs = this.prepareSaveJob();
    if (this.datos_ok) {
      console.log('Resultado del formulario de ALTA DE JOBS: ' + JSON.stringify(this.jobs));
    } else {
      alert("Errores al validar el formulario. Corregirlos para continuar");
    } 
  }
  
  prepareSaveJob(): Jobs {
    const formModel = this.altaJobsForm.value;

    // Mapeo manual de los campos del formulario y la clase JobsPrincipal
    const principalDeepCopy: JobsPrincipal = {
      cod_aplicaci: formModel.cod_aplicaci as string,
      cod_jobpl: 0,   //Sin representacion en el formulario
      des_refdocjb: formModel.des_refdocjb as string,
      des_nombrjob: formModel.des_nombrjob as string,
      des_gsoporte: formModel.des_gsoporte as string,
      des_maqori: formModel.des_maqori as string,
      des_libreori: formModel.des_libreori as string,
      des_desjobpl: formModel.des_desjobpl as string,
      des_estrupl: formModel.des_estrupl as string,
      des_periojob: formModel.des_periojob as string,
      des_maqeje: formModel.des_maqeje as string,
      xti_critijob: formModel.xti_critijob as string
    };
    
    // Mapeo automático de los campos del formulario y la clase JobsPasos1, JobsPasos2, JobsPasos3
    let jobsCriticidadDeepCopy: JobsCriticidad[] = formModel.jobsCriticidad.map(
      (jobsCriticidad: JobsCriticidad) => Object.assign({}, jobsCriticidad)
    );
    
    jobsCriticidadDeepCopy = this.valida_jobsCriticidadDeepCopy(jobsCriticidadDeepCopy);
    
    let pasos1DeepCopy: JobsPasos1[] = formModel.pasos1.map(
      (pasos1: JobsPasos1) => Object.assign({}, pasos1)
    );
    
    pasos1DeepCopy = this.valida_pasos1DeepCopy(pasos1DeepCopy);
    
    let pasos2DeepCopy: JobsPasos2[] = formModel.pasos2.map(
      (pasos2: JobsPasos2) => Object.assign({}, pasos2)
    );
    
    pasos2DeepCopy = this.valida_pasos2DeepCopy(pasos2DeepCopy);
    
    let pasos3DeepCopy: JobsPasos3[] = formModel.pasos3.map(
      (pasos3: JobsPasos3) => Object.assign({}, pasos3)
    );

    pasos3DeepCopy = this.valida_pasos3DeepCopy(pasos3DeepCopy);
    
    if (this.datos_ok) {    
      // Mapeo manual de la clase Jobs que une todas las clases que forman la tabla de jobs
      const saveJob: Jobs = {
        jobs_principal: principalDeepCopy,
        jobsCriticidad: jobsCriticidadDeepCopy,
        pasos1: pasos1DeepCopy,
        pasos2: pasos2DeepCopy,
        pasos3: pasos3DeepCopy
      };
      return saveJob;
    } else {
      return null;
    }
  }
  
  //Validaciones previas al envio de datos al servidor
  valida_jobsCriticidadDeepCopy(datos: JobsCriticidad[]) {
    for (let data of datos) {
      let data_criticidad: JobsCriticidad = data;
      
      if (data_criticidad.xti_igualdad != <string>"I" && data_criticidad.xti_igualdad != <string>'D') {
        data_criticidad.xti_igualdad = 'N';
      }
    }
    return datos;
  }
  
  valida_pasos1DeepCopy(datos: JobsPasos1[]) {
    for (let data of datos) {
      let data_pasos1: JobsPasos1 = data;
      
      if (!data_pasos1.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la primera tabla.');
      }
    }
    return datos;
  }
  
  valida_pasos2DeepCopy(datos: JobsPasos2[]) {
    for (let data of datos) {
      let data_pasos2: JobsPasos2 = data;
      
      if (!data_pasos2.des_paso) {
        this.datos_ok = false;
        this.mensaje_err.push('- Falta por informar paso en la segunda tabla.');
      }
    }
    return datos;
  }
  
  valida_pasos3DeepCopy(datos: JobsPasos3[]) {
    for (let data of datos) {
      let data_pasos3: JobsPasos3 = data;
      
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

  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                          METODOS USADOS PARA LA CONSULTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
}
