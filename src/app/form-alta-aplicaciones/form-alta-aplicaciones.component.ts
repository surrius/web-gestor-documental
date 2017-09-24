import { Aplicaciones, AplicacionesMain, Tewokcmu, Tewokdpu, Tewokpya, Tewokilu, Tewokmlu, Tewokaml, Tewokrco, Tewokrmc, Tewokmrc, Tewokofs, Tewokmfs, Tewoktfi } from '../clases/aplicaciones';
import { EnroutadorService } from '../services/enroutador.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-alta-aplicaciones',
  templateUrl: './form-alta-aplicaciones.component.html',
  styleUrls: ['./form-alta-aplicaciones.component.css']
})
export class FormAltaAplicacionesComponent implements OnInit {
  //Variebles que contendran el valor del servicio de enrutamiento
  public documento: string;
  public operacion: string;
  
  //Variable que usaremos para mostrar unicamente partes del html del alta, ya que este formulario
  //se usa tambi�n para las consultas.
  public showAlta: boolean = false;
  
  //Variables de validacion del formulario
  datos_ok: boolean = true;
  mensaje_err: string[];
  
  //Variable del tipo Aplicaciones sobre la que mapear los campos del formulario
  aplicaciones: Aplicaciones = new Aplicaciones();
  
  //Variable del tipo FormGroup (Formulario) que contendr� el formulario de altas
  public altaAppsForm: FormGroup;

  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitir� crear grupos, controles y arrays de campos para el contro del formulario
  constructor(
    private fb: FormBuilder,
    private data: EnroutadorService
  ) { }

  //Metodo que se ejecutar� tras el constructor en el que inicializaremos los campos que va a contener el 
  //formulario. Estos ser�n los mismos que el de la plantilla HTML, para luego hacer el mapeo con su clase
  ngOnInit() {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
    this.data.currentOperacion.subscribe(operacion => this.operacion = operacion);
    
    this.altaAppsForm = this.fb.group({
      cod_aplicaci: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cod_user: ['',],
      cod_userra: ['',],
      des_codmonit: ['',],
      des_detcon: ['',],
      des_funcuuaa: ['',],
      des_hmax: ['',],
      des_hvalle: ['',],
      des_monitori: ['',],
      des_nompet: ['',],
      des_objeserv: ['',],
      des_obsyrech: ['',],
      des_telsolic: ['',],
      des_telusura: ['',],
      des_tiposser: ['',],
      //  des_usura: ['',],
      des_ususerv: ['',],
      fec_monitori: ['',],
      qnu_ncargabd: ['',],
      qnu_nfichero: ['',],
      qnu_npaquete: ['',],
      qnu_nscripts: ['',],
      tim_entrega: ['',],
      tim_estimada: ['',],
      tim_finra: ['',],
      tim_implanta: ['',],
      tim_ultsol: ['',],
      xti_csancion: ['',],
      responsables: this.fb.array([this.initResponsables()]),
      ctlModificaciones: this.fb.array([this.initCtlModificaciones()]),
      descProcesos: this.fb.array([this.initDescProcesos()]),
      paradaArranque: this.fb.array([this.initParadaArranque()]),
      logNombre: this.fb.array([this.initLogNombre()]),
      logAccion: this.fb.array([this.initLogAccion()]),
      logMantenimiento: this.fb.array([this.initLogMantenimiento()]),
      reqComunicacion: this.fb.array([this.initReqComunicacion()]),
      reqMiddle: this.fb.array([this.initReqMiddle()]),
      reqMiddleB: this.fb.array([this.initReqMiddleB()]),
      reqQA: this.fb.array([this.initReqQA()]),
      caracFS: this.fb.array([this.initCaracFS()]),
      moniFS: this.fb.array([this.initMoniFS()]),
      ficheros: this.fb.array([this.initFicheros()])
    });
    
    this.showAlta = this.sw_alta_consulta(this.operacion);
  }
  
  //Metodo que decidir� si se muestran o no las partes del alta
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
      this.altaAppsForm.enable();
    } else {
      this.altaAppsForm.disable();
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
  initResponsables(): FormGroup {
    return this.fb.group({
//      des_scriptjb: [''],
//      des_scriptpr: [''],
//      des_cadenapr: [''],
//      des_scriptsu: [''],
//      des_cadenasu: ['']
    });
  }
  
  initCtlModificaciones(): FormGroup {
    return this.fb.group({
      des_versionm: [''],
      fec_version: ['']
    });
  }
  
  initDescProcesos(): FormGroup {
    return this.fb.group({
      des_acciopro: [''],
      des_nombrepr: [''],
      des_tipomoni: [''],
      xti_severida: ['']
    });
  }
  
  initParadaArranque(): FormGroup {
    return this.fb.group({
      des_arranque: [''],
      des_paradaua: ['']
    });
  }
  
  initLogNombre(): FormGroup {
    return this.fb.group({
      des_nomlog: [''],
      des_funlog: ['']
    });
  }
  
  initLogAccion(): FormGroup {
    return this.fb.group({
      des_msjlog: [''],
      xti_severida: [''],
      des_acciopro: ['']
    });
  }
  
  initLogMantenimiento(): FormGroup {
    return this.fb.group({
      des_nomlog: [''],
      qnu_tammax: [''],
      qnu_prevcrec: [''],
      qnu_critrec: [''],
      des_tratamie: ['']
    });
  }
  
  initReqComunicacion(): FormGroup {
    return this.fb.group({
      des_nomeq1: [''],
      des_nomeq2: [''],
      des_proccomu: ['']
    });
  }
  
  initReqMiddle(): FormGroup {
    return this.fb.group({
      des_gestcola: [''],
      des_nombrcol: [''],
      xti_severida: [''],
      qnu_profundi: ['']
    });
  }
  
  initReqMiddleB(): FormGroup {
    return this.fb.group({
      des_gestcola: [''],
      des_canalmdl: [''],
      des_colamdl: ['']
    });
  }
  
  initReqQA(): FormGroup {
    return this.fb.group({
//      des_nomfs: [''],
//      qnu_espaesti: [''],
//      qnu_prevcrec: [''],
//      qnu_umbramax: [''],
//      des_tratamie: ['']
    });
  }
  
  initCaracFS(): FormGroup {
    return this.fb.group({
      des_nomfs: [''],
      qnu_espaesti: [''],
      qnu_prevcrec: [''],
      qnu_umbramax: [''],
      des_tratamie: ['']
    });
  }
  
  initMoniFS(): FormGroup {
    return this.fb.group({
      des_nomfs: [''],
      qnu_minor: [''],
      qnu_critical: [''],
      des_proccomu: ['']
    });
  }
  
  initFicheros(): FormGroup {
    return this.fb.group({
      des_maqori: [''],
      des_scriptor: [''],
      des_fichentr: [''],
      des_maqdest: [''],
      des_scriptde: [''],
      des_fichdest: [''],
      des_proccomu: ['']
    });
  }
  
  //Con el metodo get, se retorna directamente una variable con el nombre del metodo (sin los () ),
  //que tendra el valor del objeto que se retorna. En este caso, retornamos las relaciones
  get responsables(): FormArray {
    return this.altaAppsForm.get('responsables') as FormArray;
  }
  
  get ctlModificaciones(): FormArray {
    return this.altaAppsForm.get('ctlModificaciones') as FormArray;
  }
  
  get descProcesos(): FormArray {
    return this.altaAppsForm.get('descProcesos') as FormArray;
  }
  
  get paradaArranque(): FormArray {
    return this.altaAppsForm.get('paradaArranque') as FormArray;
  }
  
  get logNombre(): FormArray {
    return this.altaAppsForm.get('logNombre') as FormArray;
  }
  
  get logAccion(): FormArray {
    return this.altaAppsForm.get('logAccion') as FormArray;
  }
  
  get logMantenimiento(): FormArray {
    return this.altaAppsForm.get('logMantenimiento') as FormArray;
  }
  
  get reqComunicacion(): FormArray {
    return this.altaAppsForm.get('reqComunicacion') as FormArray;
  }
  
  get reqMiddle(): FormArray {
    return this.altaAppsForm.get('reqMiddle') as FormArray;
  }
  
  get reqMiddleB(): FormArray {
    return this.altaAppsForm.get('reqMiddleB') as FormArray;
  }
  
  get caracFS(): FormArray {
    return this.altaAppsForm.get('caracFS') as FormArray;
  }
  
  get moniFS(): FormArray {
    return this.altaAppsForm.get('moniFS') as FormArray;
  }
  
  get ficheros(): FormArray {
    return this.altaAppsForm.get('ficheros') as FormArray;
  }
  
  //Metodos para a�adir elementos
  addResponsables(): void {
    this.responsables.push(this.initResponsables());
  }
  
  addCtlModificaciones(): void {
    this.ctlModificaciones.push(this.initCtlModificaciones());
  }
  
  addDescProcesos(): void {
    this.descProcesos.push(this.initDescProcesos());
  }
  
  addParadaArranque(): void {
    this.paradaArranque.push(this.initParadaArranque());
  }
  
  addLogNombre(): void {
    this.logNombre.push(this.initLogNombre());
  }
  
  addLogAccion(): void {
    this.logAccion.push(this.initLogAccion());
  }
  
  addLogMantenimiento(): void {
    this.logMantenimiento.push(this.initLogMantenimiento());
  }
  
  addReqComunicacion(): void {
    this.reqComunicacion.push(this.initReqComunicacion());
  }
  
  addReqMiddle(): void {
    this.reqMiddle.push(this.initReqMiddle());
  }
  
  addReqMiddleB(): void {
    this.reqMiddleB.push(this.initReqMiddleB());
  }
  
  addCaracFS(): void {
    this.caracFS.push(this.initCaracFS());
  }
  
  addMoniFS(): void {
    this.moniFS.push(this.initMoniFS());
  }
  
  addFicheros(): void {
    this.ficheros.push(this.initFicheros());
  }
  
  //Metodos para eliminar elementos
  removeResponsables(i: number): void {
    this.responsables.removeAt(i);
  }
  
  removeCtlModif(j: number): void {
    this.ctlModificaciones.removeAt(j);
  }
  
  removeDescProcesos(k: number): void {
    this.descProcesos.removeAt(k);
  }
  
  removeParadaArranque(l: number): void {
    this.paradaArranque.removeAt(l);
  }
  
  removeLogNombre(m: number): void {
    this.logNombre.removeAt(m);
  }
  
  removeLogAccion(n: number): void {
    this.logAccion.removeAt(n);
  }
  
  removeLogMantenimiento(o: number): void {
    this.logMantenimiento.removeAt(o);
  }
  
  removeReqComunicacion(p: number): void {
    this.reqComunicacion.removeAt(p);
  }
  
  removeReqMiddle(q: number): void {
    this.reqMiddle.removeAt(q);
  }
  
  removeReqMiddleB(r: number): void {
    this.reqMiddleB.removeAt(r);
  }
  
  removeCaracFS(t: number): void {
    this.caracFS.removeAt(t);
  }
  
  removeMoniFS(u: number): void {
    this.moniFS.removeAt(u);
  }
  
  removeFicheros(zi: number): void {
    this.ficheros.removeAt(zi);
  }
  
  /* ***************************************************** */
  /*    METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB     */
  /* ***************************************************** */
  onSubmit() {
    this.datos_ok = true;
    this.mensaje_err = [];
    this.aplicaciones = this.prepareSaveAplicacion();
    if (this.datos_ok) {
      console.log('Resultado del formulario de ALTA DE CADENAS: ' + JSON.stringify(this.aplicaciones));
    } else {
      alert("Errores al validar el formulario. Corregirlos para continuar");
    } 
  }
  
  prepareSaveAplicacion(): Aplicaciones {
    const formModel = this.altaAppsForm.value;

    // Mapeo manual de los campos del formulario y la clase JobsPrincipal
    const principalDeepCopy: AplicacionesMain = {
      cod_aplicaci: formModel.cod_aplicaci as string,
      cod_user: formModel.cod_user as string,
      cod_userra: formModel.cod_userra as string,
      des_codmonit: formModel.des_codmonit as string,
      des_detcon: formModel.des_detcon as string,
      des_funcuuaa: formModel.des_funcuuaa as string,
      des_hmax: formModel.des_hmax as string,
      des_hvalle: formModel.des_hvalle as string,
      des_monitori: formModel.des_monitori as string,
      des_nompet: formModel.des_nompet as string,
      des_objeserv: formModel.des_objeserv as string,
      des_obsyrech: formModel.des_obsyrech as string,
      des_telsolic: formModel.des_telsolic as string,
      des_telusura: formModel.des_telusura as string,
      des_tiposser: formModel.des_tiposser as string,
      //  des_usura: formModel.des_usura as string,
      des_ususerv: formModel.des_ususerv as string,
      fec_monitori: formModel.fec_monitori as Date,
      qnu_ncargabd: formModel.qnu_ncargabd as number,
      qnu_nfichero: formModel.qnu_nfichero as number,
      qnu_npaquete: formModel.qnu_npaquete as number,
      qnu_nscripts: formModel.qnu_nscripts as number,
      tim_entrega: formModel.tim_entrega as Date,
      tim_estimada: formModel.tim_estimada as Date,
      tim_finra: formModel.tim_finra as Date,
      tim_implanta: formModel.tim_implanta as Date,
      tim_ultsol: formModel.tim_ultsol as Date,
      xti_csancion: formModel.xti_csancion as string
    };
    
    // Mapeo autom�tico de los campos del formulario que son arrays
//    const responsablesDeepCopy: TEWOK[] = formModel.responsables.map(
//      (responsables: TEWOK) => Object.assign({}, responsables)
//    );
    
    const ctlModificacionesDeepCopy: Tewokcmu[] = formModel.ctlModificaciones.map(
      (ctlModificaciones: Tewokcmu) => Object.assign({}, ctlModificaciones)
    );
    
    const descProcesosDeepCopy: Tewokdpu[] = formModel.descProcesos.map(
      (descProcesos: Tewokdpu) => Object.assign({}, descProcesos)
    );
    
    const paradaArranqueDeepCopy: Tewokpya[] = formModel.paradaArranque.map(
      (paradaArranque: Tewokpya) => Object.assign({}, paradaArranque)
    );
    
    const logNombreDeepCopy: Tewokilu[] = formModel.logNombre.map(
      (logNombre: Tewokilu) => Object.assign({}, logNombre)
    );
    
    const logAccionDeepCopy: Tewokmlu[] = formModel.logAccion.map(
      (logAccion: Tewokmlu) => Object.assign({}, logAccion)
    );
    
    const logMantenimientoDeepCopy: Tewokaml[] = formModel.logMantenimiento.map(
      (logMantenimiento: Tewokaml) => Object.assign({}, logMantenimiento)
    );
    
    const reqComunicacionDeepCopy: Tewokrco[] = formModel.reqComunicacion.map(
      (reqComunicacion: Tewokrco) => Object.assign({}, reqComunicacion)
    );
    
    const reqMiddleDeepCopy: Tewokrmc[] = formModel.reqMiddle.map(
      (reqMiddle: Tewokrmc) => Object.assign({}, reqMiddle)
    );
    
    const reqMiddleBDeepCopy: Tewokmrc[] = formModel.reqMiddleB.map(
      (reqMiddleB: Tewokmrc) => Object.assign({}, reqMiddleB)
    );
    
    const caracFSDeepCopy: Tewokofs[] = formModel.caracFS.map(
      (caracFS: Tewokofs) => Object.assign({}, caracFS)
    );
    
    const moniFSDeepCopy: Tewokmfs[] = formModel.moniFS.map(
      (moniFS: Tewokmfs) => Object.assign({}, moniFS)
    );
    
    const ficherosDeepCopy: Tewoktfi[] = formModel.ficheros.map(
      (ficheros: Tewoktfi) => Object.assign({}, ficheros)
    );
    
    // Mapeo manual de la clase general de Aplicaciones que une todas las clases que forman la tabla
    if (this.datos_ok) { 
      const saveAplicacion: Aplicaciones = {
        aplicacionesMain: principalDeepCopy,
//        tewokxxx: responsablesDeepCopy,
        tewokcmu: ctlModificacionesDeepCopy,
        tewokdpu: descProcesosDeepCopy,
        tewokpya: paradaArranqueDeepCopy,
        tewokilu: logNombreDeepCopy,
        tewokmlu: logAccionDeepCopy,
        tewokaml: logMantenimientoDeepCopy,
        tewokrco: reqComunicacionDeepCopy,
        tewokrmc: reqMiddleDeepCopy,
        tewokmrc: reqMiddleBDeepCopy,
        tewokofs: caracFSDeepCopy,
        tewokmfs: moniFSDeepCopy,
        tewoktfi: ficherosDeepCopy
      };
      return saveAplicacion;
    } else {
      return null;
    }
  }
  
  //Validaciones previas al envio de datos al servidor
//  valida_ctlModificacionesDeepCopy(datos: Tewokcmu[]) {
//    for (let data of datos) {
//      let data_ctlModificaciones: Tewokcmu = data;
//      
//      if (data_ctlModificaciones.des_versionm) {
//        data_ctlModificaciones.des_versionm = '';
//      }
//    }
//    return datos;
//  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                          METODOS USADOS PARA LA CONSULTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
}
