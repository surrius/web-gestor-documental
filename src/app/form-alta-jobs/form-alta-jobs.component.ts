import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { JobsPrincipal, Pruebas, Pasos1 } from '../clases/jobs';

@Component({
  selector: 'app-form-alta-jobs',
  templateUrl: './form-alta-jobs.component.html',
  styleUrls: ['./form-alta-jobs.component.css']
})
  
export class FormAltaJobsComponent implements OnInit {
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaJobsForm: FormGroup;

  //La instancia _fb nos permitirá crear grupos, controles y arrays de campos para los formularios
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    // Creacion de los campos del formulario
    this.altaJobsForm = this._fb.group({
      des_nombrjob: ['', [Validators.required, Validators.minLength(8)]],
      pasos1: this._fb.array([])
    });

    // En la carga inicial, creamos la primera linea de los pasos
    this.addPaso();
  }

  initPaso(): FormGroup {
    return this._fb.group({
      des_paso: [''],
      des_fichentr: [''],
      des_fichsali: [''],
      des_entibd: [''],
      des_accesbd: ['']
    });
  }

  get pasos1(): FormArray {
    return this.altaJobsForm.get('pasos1') as FormArray;
  }
  
  
  addPaso() {
//    this.pasos1.push(this._fb.group(new Pasos1()));
    
    const control = this.altaJobsForm.get('pasos1') as FormArray;
    const addrCtrl = this.initPaso();

    control.push(addrCtrl);
    
//    const control = <FormArray>this.altaJobsForm.controls['pasos1'];
//    const addrCtrl = this.initPaso();
//
//    control.push(addrCtrl);
  }
  
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
