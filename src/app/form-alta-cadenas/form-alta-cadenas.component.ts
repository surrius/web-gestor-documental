import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CadenaPrincipal, Tewokcrds, Cadenas } from '../clases/cadenas';
import { EnroutadorService } from '../services/enroutador.service';
import { BbddCadenasService } from '../services/bbdd-cadenas.service';

@Component({
  selector: 'app-form-alta-cadenas',
  templateUrl: './form-alta-cadenas.component.html',
  styleUrls: ['./form-alta-cadenas.component.css']
})
  
export class FormAltaCadenasComponent implements OnInit {
  //Variebles que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
  //Variable que usaremos para mostrar unicamente partes del html del alta, ya que este formulario
  //se usa también para las consultas.
  public showAlta: boolean = false;
  
  //Variables de validacion del formulario
  datos_ok: boolean = true;
  mensaje_err: string[];
  
  //Variables de informacion de los combos
  periodicidad: any[] = [['D','Diaria'],['S','Semanal'],['M','Mensual'],['T','Trimestral'],['A','Anual']];
  criticidadcdn: any[] = [['N','No cr&iacute;tico'],['A','Alta'],['M','Media'],['B','Baja'],['A','Aviso d&iacute;a siguiente']];
  
  //Variable del tipo Cadenas sobre la que mapear los campos del formulario
  cadenas: Cadenas = new Cadenas();
  
  //Variables de comunicación
  errorMessage: string;
  statusCode: number;
  
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaCadenasForm: FormGroup;

  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el contro del formulario
  constructor(
    private fb: FormBuilder,
    private bbddCadenasService: BbddCadenasService,
    private data: EnroutadorService
  ) { }

  //Metodo que se ejecutará tras el constructor en el que inicializaremos los campos que va a contener el 
  //formulario. Estos serán los mismos que el de la plantilla HTML, para luego hacer el mapeo con su clase
  ngOnInit() {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
    
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
      this.altaCadenasForm.enable();
    } else {
      this.altaCadenasForm.disable();
    }
    return resultado;
  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                              METODOS USADOS PARA EL ALTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
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
  
  /* ***************************************************** */
  /* METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB
  /* ***************************************************** */
  onSubmit() {
    this.datos_ok = true;
    this.mensaje_err = [];
    this.cadenas = this.prepareSaveCadena();
    if (this.datos_ok) {
      console.log(this.cadenas);
      console.log('Resultado del formulario de ALTA DE CADENAS: ' + JSON.stringify(this.cadenas));
      //Creacion de la cadena
      this.bbddCadenasService.createCadena(this.cadenas)
        .subscribe(successCode => {
          this.statusCode = successCode;
        },
        errorCode => this.statusCode = errorCode
        );
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
          cod_cadenapl: 0   //Sin representacion en el formulario
        },
        aud_timcrea: 0,
        aud_timmodif: 0,
        aud_usuario: '',
        cod_autouni: 0,
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
        //        cadena_principal: principalDeepCopy,
        tewokcrds: relacionesDeepCopy
      };
      return saveCadena;
    } else {
      return null;
    }
  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                          METODOS USADOS PARA LA CONSULTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
}
