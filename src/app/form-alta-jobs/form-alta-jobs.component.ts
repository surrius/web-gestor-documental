import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { JobsPrincipal, JobsPasos1, JobsPasos2, JobsPasos3, Jobs } from '../clases/jobs';

@Component({
  selector: 'app-form-alta-jobs',
  templateUrl: './form-alta-jobs.component.html',
  styleUrls: ['./form-alta-jobs.component.css']
})
  
export class FormAltaJobsComponent implements OnInit {
  //TODO: Quitar, variable de pruebas
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  // Control de visualizacion del componente
//  @Input() showMe: boolean;
  
  //Variable del tipo Jobs sobre la que mapear los campos del formulario
  jobs: Jobs = new Jobs();
  
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaJobsForm: FormGroup;

  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el contro del formulario
  constructor(private fb: FormBuilder) { }

  //Metodo que se ejecutará tras el constructor en el que inicializaremos los campos que va a contener el 
  //formulario. Estos serán los mismos que el de la plantilla HTML, para luego hacer el mapeo con su clase
  ngOnInit() {
    this.altaJobsForm = this.fb.group({
      cod_aplicaci: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      des_refdocjb: ['', [Validators.required, Validators.minLength(8)]],
      des_nombrjob: ['', [Validators.required, Validators.minLength(8)]],
      des_gsoporte: [''],
      des_maqori: [''],
      des_libreori: [''],
      des_desjobpl: [''],
      des_estrupl: [''],
      des_periojob: [''],
      des_maqeje: [''],
      pasos1: this.fb.array([this.initPaso1()]),
      pasos2: this.fb.array([this.initPaso2()]),
      pasos3: this.fb.array([this.initPaso3()])
    });
  }

  /*
   * Metodos usados para crear un nuevo paso inicializado, declarando si es 
   * preciso sus validaciones de formulario a tener en cuenta.
   */
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
      des_critinco: ['']
    });
  }
  
  //Con el metodo get, se retorna directamente una variable con el nombre del metodo (sin los () ),
  //que tendra el valor del objeto que se retorna. En este caso, retornamos los pasos
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
    this.jobs = this.prepareSaveJob();
    console.log('Resultado del formulario de ALTA DE JOBS: ' + JSON.stringify(this.jobs));
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
      xti_critijob: ''
    };
    
    // Mapeo automático de los campos del formulario y la clase JobsPasos1, JobsPasos2, JobsPasos3
    const pasos1DeepCopy: JobsPasos1[] = formModel.pasos1.map(
      (pasos1: JobsPasos1) => Object.assign({}, pasos1)
    );
    
    const pasos2DeepCopy: JobsPasos2[] = formModel.pasos2.map(
      (pasos2: JobsPasos2) => Object.assign({}, pasos2)
    );
    
    const pasos3DeepCopy: JobsPasos3[] = formModel.pasos3.map(
      (pasos3: JobsPasos3) => Object.assign({}, pasos3)
    );

    // Mapeo manual de la clase Jobs que une todas las clases que forman la tabla de jobs
    const saveJob: Jobs = {
      jobs_principal: principalDeepCopy,
      pasos1: pasos1DeepCopy,
      pasos2: pasos2DeepCopy,
      pasos3: pasos3DeepCopy
    };
    return saveJob;
    
  }
   /* ***************************************************** */
  
//  /* ***************************************
//   * Creacion del formulario anterior donde
//   * no daba fallo el html, pero que es 
//   * menos clara que la actual.
//   * ***************************************
//   */  
//  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
//  public altaJobsForm: FormGroup;
//
//  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el control del formulario
//  constructor(private fb: FormBuilder) { }
//
//  ngOnInit() {
//    // Creacion de los campos del formulario
//    this.altaJobsForm = this.fb.group({
//      des_nombrjob: ['', [Validators.required, Validators.minLength(8)]],
//      pasos1: this.fb.array([])
//    });
//
//    // En la carga inicial, creamos la primera linea de los pasos
//    this.addPaso();
//  }
//
//  /*
//   * Metodo usado para crear un nuevo paso inicializado, declarando si es 
//   * preciso sus validaciones de formulario a tener en cuenta.
//   */
//  initPaso(): FormGroup {
//    return this.fb.group({
//      des_paso: [''],
//      des_fichentr: [''],
//      des_fichsali: [''],
//      des_entibd: [''],
//      des_accesbd: ['']
//    });
//  }
//
//  get pasos1(): FormArray {
//    return this.altaJobsForm.get('pasos1') as FormArray;
//  }
//  
//  addPaso() {
//    const control = this.altaJobsForm.get('pasos1') as FormArray;
//    const addrCtrl = this.initPaso();
//
//    control.push(addrCtrl);
//  }
  
/*  
  alta_jobs = new JobsPrincipal();
  //Datos para rellenar el combo del grupo de soprote
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  public onSubmit() {
    console.log('ha pulsado en submit en ALTA DE JOBS. Desde método de clase: ' + this.alta_jobs.consulta);
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar ALTA JOBS');
    this.alta_jobs = new JobsPrincipal();
  }
 */ 
}
