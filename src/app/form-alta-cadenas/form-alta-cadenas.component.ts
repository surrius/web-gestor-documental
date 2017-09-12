import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { CadenaPrincipal, CadenaRelaciones, Cadenas } from '../clases/cadenas';

@Component({
  selector: 'app-form-alta-cadenas',
  templateUrl: './form-alta-cadenas.component.html',
  styleUrls: ['./form-alta-cadenas.component.css']
})
  
export class FormAltaCadenasComponent implements OnInit {

  // Control de visualizacion del componente
//  @Input() showMe: boolean;
  
  //Variable del tipo Cadenas sobre la que mapear los campos del formulario
  cadenas: Cadenas = new Cadenas();
  
  //Variable del tipo FormGroup (Formulario) que contendr� el formulario de altas
  public altaCadenasForm: FormGroup;

  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitir� crear grupos, controles y arrays de campos para el contro del formulario
  constructor(private fb: FormBuilder) { }

  //Metodo que se ejecutar� tras el constructor en el que inicializaremos los campos que va a contener el 
  //formulario. Estos ser�n los mismos que el de la plantilla HTML, para luego hacer el mapeo con su clase
  ngOnInit() {
    this.altaCadenasForm = this.fb.group({
      cod_aplicaci: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      des_refdocum: ['', [Validators.required, Validators.minLength(8)]],
      des_cadenapl: ['', [Validators.required, Validators.minLength(8)]],
      des_autor: [''],
      fec_modifica: [''],
      des_equipocd: [''],
      xti_periocdn: [''],
      des_diaejecu: [''],
      des_horaejec: [''],
      xti_critical: [''],
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
  
  //Metodos para a�adir una nueva relacion
  addRelacion(): void {
    this.relaciones.push(this.initRelacion());
  }
  
  //Metodos para eliminar una relacion
  removeRelacion(i: number): void {
    this.relaciones.removeAt(i);
  }
  
  /* ***************************************************** */
  /* METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB
  /* ***************************************************** */
  onSubmit() {
    this.cadenas = this.prepareSaveCadena();
    console.log('Resultado del formulario de ALTA DE JOBS: ' + JSON.stringify(this.cadenas));
  }
  
  prepareSaveCadena(): Cadenas {
    const formModel = this.altaCadenasForm.value;

    // Mapeo manual de los campos del formulario y la clase JobsPrincipal
    const principalDeepCopy: CadenaPrincipal = {
      cod_aplicaci: formModel.cod_aplicaci as string,
      cod_cadenapl: 0,   //Sin representacion en el formulario
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
      des_incompat: formModel.des_incompat as string
    };
    
    // Mapeo autom�tico de los campos del formulario y la clase CadenaRelaciones
    const relacionesDeepCopy: CadenaRelaciones[] = formModel.relaciones.map(
      (relaciones: CadenaRelaciones) => Object.assign({}, relaciones)
    );
    
    // Mapeo manual de la clase Cadenas que une todas las clases que forman la tabla
    const saveCadena: Cadenas = {
      cadena_principal: principalDeepCopy,
      cadena_relaciones: relacionesDeepCopy
    };
    return saveCadena;
  }
  
}
