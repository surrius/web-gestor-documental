import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

import { Aplicaciones, AppID, Tewokamls, Tewokbcks, Tewokcmus, Tewokdpus, 
  Tewokibds, Tewokilus, Tewokmbds, Tewokmfss, Tewokmlus, Tewokmrcs, Tewokofss,
  Tewokpyas, Tewokrcos, Tewokress, Tewokrmcs, Tewoktfis, Tewokwebs } from '../clases/aplicaciones';
import { BbddAplicacionesService } from '../services/bbdd-aplicaciones.service';
import { EnroutadorService } from '../services/enroutador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-alta-aplicaciones',
  templateUrl: './form-alta-aplicaciones.component.html',
  styleUrls: ['./form-alta-aplicaciones.component.css']
})
export class FormAltaAplicacionesComponent implements OnInit {
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
  
  //Variables de los combos repetitivos
  severidad: any[] = [['A','Alta'],['M','Media'],['B','Baja']];
  bbdd: any[] = [['O','Oracle'],['D','DB2']];
  sweb: any[] = [['E','Web'],['A','Was']];
  backup: any[] = [['F','FileSystem'],['B','Base de Datos']];
  tipos: any[] = [['O','Online (BBDD)'],['T','Total (BBDD)'],['I','Incremental (FS)'],['C','Completo (FS)']];
  periodicidad: any[] = [['D','Diaria'],['S','Semanal'],['M','Mensual'],['T','Trimestral'],['A','Anual']];
  
  //Variables de validacion del formulario
  datos_ok: boolean = true;
  mensaje_err: string[];
  
  //Variable del tipo Aplicaciones sobre la que mapear los campos del formulario
  aplicaciones: Aplicaciones = new Aplicaciones();
  
  //Variables de comunicación
  errorMessage: string;
  statusCode: number;
  
  //Variable del tipo FormGroup (Formulario) que contendrá el formulario de altas
  public altaAppsForm: FormGroup;

  /* ******************************** */
  /*    Variables para la consulta    */
  /* ******************************** */
  ini_id = {
    cod_aplicaci: null,
    cod_planuuaa: null
  };
  id: any;
  private sub: any;
  
  //CONSTRUCTOR DEL COMPONNENTE:
  //La instancia fb nos permitirá crear grupos, controles y arrays de campos para el contro del formulario
  constructor(
    private fb: FormBuilder,
    private bbddAplicacionesService: BbddAplicacionesService,
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
        this.aplicaciones.id = this.ini_id;
        this.aplicaciones.id.cod_aplicaci = this.id.cod_aplicaci;
        this.aplicaciones.id.cod_planuuaa = this.id.cod_planuuaa;
        //console.log(this.aplicaciones);
        this.bdBuscaAplicacionId(this.aplicaciones);
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
    this.altaAppsForm = this.fb.group({
      cod_aplicaci: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cod_planuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
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
      des_usura: ['',],
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
      caracFS: this.fb.array([this.initCaracFS()]),
      moniFS: this.fb.array([this.initMoniFS()]),
      bbddA: this.fb.array([this.initBbddA()]),
      bbddB: this.fb.array([this.initBbddB()]),
      servidor: this.fb.array([this.initServidor()]),
      ficheros: this.fb.array([this.initFicheros()]),
      backups: this.fb.array([this.initBackups()])
    });
  }
  
  /*
   * Metodos usados para crear una nueva relacion inicializada, declarando si es 
   * preciso sus validaciones de formulario a tener en cuenta.
   */
  initResponsables(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_user: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_usucateg: [''],
      des_nombyape: [''],
      des_telinter: [''],
      des_telexter: ['']
    });
  }
  
  initCtlModificaciones(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_versionm: [''],
      fec_version: ['']
    });
  }
  
  initDescProcesos(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_jobpl: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_acciopro: [''],
      des_nombrepr: [''],
      des_tipomoni: [''],
      xti_severida: ['']
    });
  }
  
  initParadaArranque(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_arranque: [''],
      des_paradaua: ['']
    });
  }
  
  initLogNombre(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_nomlog: [''],
      des_funlog: ['']
    });
  }
  
  initLogAccion(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_msjlog: [''],
      xti_severida: [''],
      des_acciopro: ['']
    });
  }
  
  initLogMantenimiento(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_nomlog: [''],
      qnu_tammax: [''],
      qnu_prevcrec: [''],
      qnu_critrec: [''],
      des_tratamie: ['']
    });
  }
  
  initReqComunicacion(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_nomeq1: [''],
      des_nomeq2: [''],
      des_proccomu: ['']
    });
  }
  
  initReqMiddle(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_gestcola: [''],
      des_nombrcol: [''],
      xti_severida: [''],
      qnu_profundi: ['']
    });
  }
  
  initReqMiddleB(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_gestcola: [''],
      des_canalmdl: [''],
      des_colamdl: ['']
    });
  }
  
  initCaracFS(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_nomfs: [''],
      qnu_espaesti: [''],
      qnu_prevcrec: [''],
      qnu_umbramax: [''],
      des_tratamie: ['']
    });
  }
  
  initMoniFS(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_nomfs: [''],
      qnu_minor: [''],
      qnu_critical: [''],
      des_proccomu: ['']
    });
  }
  
  initBbddA(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      xti_gestbbdd: [''],
      cod_nombbdd: [''],
      des_listenbd: [''],
      des_usubd: [''],
      des_proccomu: ['']
    });
  }
  
  initBbddB(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      xti_gestbbdd: [''],
      cod_nombbdd: [''],
      des_instabd: [''],
      cod_tablbbdd: [''],
      qnu_severo: [''],
      qnu_critical: [''],
      des_proccomu: ['']
    });
  }
  
  initServidor(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      xti_serviapl: [''],
      des_instaweb: [''],
      des_proccomu: ['']
    });
  }
  
  initFicheros(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      des_maqori: [''],
      des_scriptor: [''],
      des_fichentr: [''],
      des_maqdest: [''],
      des_scriptde: [''],
      des_fichdest: [''],
      des_proccomu: ['']
    });
  }
  
  initBackups(): FormGroup {
    return this.fb.group({
      cod_aplicaci: [''],
      cod_planuuaa: [''],
      cod_secuuaa: [''],
      aud_timcrea: [''],
      aud_timmodif: [''],
      aud_usuario: [''],
      cod_autouni: [''],
      
      xti_gestbbdd: [''],
      xti_backup: [''],
      xti_periodo: [''],
      des_ciclovid: [''],
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
  
  get bbddA(): FormArray {
    return this.altaAppsForm.get('bbddA') as FormArray;
  }
  
  get bbddB(): FormArray {
    return this.altaAppsForm.get('bbddB') as FormArray;
  }
  
  get servidor(): FormArray {
    return this.altaAppsForm.get('servidor') as FormArray;
  }
  
  get ficheros(): FormArray {
    return this.altaAppsForm.get('ficheros') as FormArray;
  }
  
  get backups(): FormArray {
    return this.altaAppsForm.get('backups') as FormArray;
  }
  
  //Metodos para añadir elementos
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
  
  addBbddA(): void {
    this.bbddA.push(this.initBbddA());
  }
  
  addBbddB(): void {
    this.bbddB.push(this.initBbddB());
  }
  
  addServidor(): void {
    this.servidor.push(this.initServidor());
  }
  
  addFicheros(): void {
    this.ficheros.push(this.initFicheros());
  }
  
  addBackups(): void {
    this.ficheros.push(this.initBackups());
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
  
  removeBbddA(w: number): void {
    this.bbddA.removeAt(w);
  }
  
  removeBbddB(x: number): void {
    this.bbddB.removeAt(x);
  }
  
  removeServidor(y: number): void {
    this.servidor.removeAt(y);
  }
  
  removeFicheros(z: number): void {
    this.ficheros.removeAt(z);
  }
  
  removeBackups(z1: number): void {
    this.ficheros.removeAt(z1);
  }
  
  // Metodo para resetear los datos del formulario
  public limpiar() {
    this.altaAppsForm.enable();
    this.crearFormulario();
    this.aplicaciones = new Aplicaciones();
    this.aplicaciones.id = this.ini_id;
    this.aplicaciones.id.cod_aplicaci = null;
    this.aplicaciones.id.cod_planuuaa = null;
  }
  
  /* ***************************************************** */
  /*    METODOS PARA PREPARAR EL ENVIO AL SERVICIO WEB     */
  /* ***************************************************** */
  onSubmit() {
    this.datos_ok = true;
    this.mensaje_err = [];
    this.aplicaciones = this.prepareSaveAplicacion();
    
    if (this.datos_ok) {
      console.log(this.aplicaciones);
      console.log('Resultado del formulario de ALTA DE APLICACIONES: ' + JSON.stringify(this.aplicaciones));
      
      if (this.operacion == 'modificacion') {
        this.modificaAplicacion(this.aplicaciones);
      } else {
        this.altaNuevaAplicacion(this.aplicaciones);
      }
      
    } else {
      alert("Errores al validar el formulario. Corregirlos para continuar");
    } 
  }
  
  prepareSaveAplicacion(): Aplicaciones {
    const formModel = this.altaAppsForm.value;

    // Mapeo manual de los campos del formulario y la clase JobsPrincipal
//    const principalDeepCopy: AplicacionesMain = {
//      cod_aplicaci: formModel.cod_aplicaci as string,
//      cod_user: formModel.cod_user as string,
//      cod_userra: formModel.cod_userra as string,
//      des_codmonit: formModel.des_codmonit as string,
//      des_detcon: formModel.des_detcon as string,
//      des_funcuuaa: formModel.des_funcuuaa as string,
//      des_hmax: formModel.des_hmax as string,
//      des_hvalle: formModel.des_hvalle as string,
//      des_monitori: formModel.des_monitori as string,
//      des_nompet: formModel.des_nompet as string,
//      des_objeserv: formModel.des_objeserv as string,
//      des_obsyrech: formModel.des_obsyrech as string,
//      des_telsolic: formModel.des_telsolic as string,
//      des_telusura: formModel.des_telusura as string,
//      des_tiposser: formModel.des_tiposser as string,
//      des_usura: formModel.des_usura as string,
//      des_ususerv: formModel.des_ususerv as string,
//      fec_monitori: formModel.fec_monitori as Date,
//      qnu_ncargabd: formModel.qnu_ncargabd as number,
//      qnu_nfichero: formModel.qnu_nfichero as number,
//      qnu_npaquete: formModel.qnu_npaquete as number,
//      qnu_nscripts: formModel.qnu_nscripts as number,
//      tim_entrega: formModel.tim_entrega as Date,
//      tim_estimada: formModel.tim_estimada as Date,
//      tim_finra: formModel.tim_finra as Date,
//      tim_implanta: formModel.tim_implanta as Date,
//      tim_ultsol: formModel.tim_ultsol as Date,
//      xti_csancion: formModel.xti_csancion as string
//    };
    
    // Mapeo automático de los campos del formulario que son arrays
//    const responsablesDeepCopy: Tewokres[] = formModel.responsables.map(
//      (responsables: Tewokres) => Object.assign({}, responsables)
//    );
    let responsablesDeepCopy: Tewokress[] = this.validarTewokress(formModel.responsables);
    
//    const ctlModificacionesDeepCopy: Tewokcmu[] = formModel.ctlModificaciones.map(
//      (ctlModificaciones: Tewokcmu) => Object.assign({}, ctlModificaciones)
//    );
    let ctlModificacionesDeepCopy: Tewokcmus[] = this.validarTewokcmus(formModel.ctlModificaciones);
    
//    const descProcesosDeepCopy: Tewokdpu[] = formModel.descProcesos.map(
//      (descProcesos: Tewokdpu) => Object.assign({}, descProcesos)
//    );
    let descProcesosDeepCopy: Tewokdpus[] = this.validarTewokdpus(formModel.descProcesos);
    
//    const paradaArranqueDeepCopy: Tewokpya[] = formModel.paradaArranque.map(
//      (paradaArranque: Tewokpya) => Object.assign({}, paradaArranque)
//    );
    let paradaArranqueDeepCopy: Tewokpyas[] = this.validarTewokpyas(formModel.paradaArranque);
    
//    const logNombreDeepCopy: Tewokilu[] = formModel.logNombre.map(
//      (logNombre: Tewokilu) => Object.assign({}, logNombre)
//    );
    let logNombreDeepCopy: Tewokilus[] = this.validarTewokilus(formModel.logNombre);
    
//    const logAccionDeepCopy: Tewokmlu[] = formModel.logAccion.map(
//      (logAccion: Tewokmlu) => Object.assign({}, logAccion)
//    );
    let logAccionDeepCopy: Tewokmlus[] = this.validarTewokmlus(formModel.logAccion);
    
//    const logMantenimientoDeepCopy: Tewokaml[] = formModel.logMantenimiento.map(
//      (logMantenimiento: Tewokaml) => Object.assign({}, logMantenimiento)
//    );
    let logMantenimientoDeepCopy: Tewokamls[] = this.validarTewokamls(formModel.logMantenimiento);
    
//    const reqComunicacionDeepCopy: Tewokrco[] = formModel.reqComunicacion.map(
//      (reqComunicacion: Tewokrco) => Object.assign({}, reqComunicacion)
//    );
    let reqComunicacionDeepCopy: Tewokrcos[] = this.validarTewokrcos(formModel.reqComunicacion);
    
//    const reqMiddleDeepCopy: Tewokrmc[] = formModel.reqMiddle.map(
//      (reqMiddle: Tewokrmc) => Object.assign({}, reqMiddle)
//    );
    let reqMiddleDeepCopy: Tewokrmcs[] = this.validarTewokrmc(formModel.reqMiddle);
    
//    const reqMiddleBDeepCopy: Tewokmrc[] = formModel.reqMiddleB.map(
//      (reqMiddleB: Tewokmrc) => Object.assign({}, reqMiddleB)
//    );
    let reqMiddleBDeepCopy: Tewokmrcs[] = this.validarTewokmrcs(formModel.reqMiddleB);
    
//    const caracFSDeepCopy: Tewokofs[] = formModel.caracFS.map(
//      (caracFS: Tewokofs) => Object.assign({}, caracFS)
//    );
    let caracFSDeepCopy: Tewokofss[] = this.validarTewokofss(formModel.caracFS);
    
//    const moniFSDeepCopy: Tewokmfs[] = formModel.moniFS.map(
//      (moniFS: Tewokmfs) => Object.assign({}, moniFS)
//    );
    let moniFSDeepCopy: Tewokmfss[] = this.validarTewokmfss(formModel.moniFS);
    
//    const bbddADeepCopy: Tewokibd[] = formModel.bbddA.map(
//      (bbddA: Tewokibd) => Object.assign({}, bbddA)
//    );
    let bbddADeepCopy: Tewokibds[] = this.validarTewokibds(formModel.bbddA);
    
//    const bbddBDeepCopy: Tewokmbd[] = formModel.bbddB.map(
//      (bbddB: Tewokmbd) => Object.assign({}, bbddB)
//    );
    let bbddBDeepCopy: Tewokmbds[] = this.validarTewokmbds(formModel.bbddB);
    
//    const servidorDeepCopy: Tewokweb[] = formModel.servidor.map(
//      (servidor: Tewokweb) => Object.assign({}, servidor)
//    );
    let servidorDeepCopy: Tewokwebs[] = this.validarTewokwebs(formModel.servidor);
    
//    const ficherosDeepCopy: Tewoktfi[] = formModel.ficheros.map(
//      (ficheros: Tewoktfi) => Object.assign({}, ficheros)
//    );
    let ficherosDeepCopy: Tewoktfis[] = this.validarTewoktfis(formModel.ficheros);
    
//    const backupsDeepCopy: Tewokbck[] = formModel.backups.map(
//      (backups: Tewokbck) => Object.assign({}, backups)
//    );
    let backupsDeepCopy: Tewokbcks[] = this.validarTewokbcks(formModel.backups);
    
    // Mapeo manual de la clase general de Aplicaciones que une todas las clases que forman la tabla
    if (this.datos_ok) {
      const saveAplicacion: Aplicaciones = {
        //        aplicacionesMain: principalDeepCopy,
        id: {
          cod_aplicaci: formModel.cod_aplicaci ? formModel.cod_aplicaci as string : null,
          cod_planuuaa: formModel.cod_planuuaa ? formModel.cod_planuuaa as number : null
        },
        aud_timcrea: formModel.aud_timcrea ? formModel.aud_timcrea as number : null,
        aud_timmodif: formModel.aud_timmodif ? formModel.aud_timmodif as number : null,
        aud_usuario: formModel.aud_usuario ? formModel.aud_usuario as string : null,
        cod_autouni: formModel.cod_autouni ? formModel.cod_autouni as number : null,

        cod_user: formModel.cod_user ? formModel.cod_user as string : null,
        cod_userra: formModel.cod_userra ? formModel.cod_userra as string : null,
        des_codmonit: formModel.des_codmonit ? formModel.des_codmonit as string : null,
        des_detcon: formModel.des_detcon ? formModel.des_detcon as string : null,
        des_funcuuaa: formModel.des_funcuuaa ? formModel.des_funcuuaa as string : null,
        des_hmax: formModel.des_hmax ? formModel.des_hmax as string : null,
        des_hvalle: formModel.des_hvalle ? formModel.des_hvalle as string : null,
        des_monitori: formModel.des_monitori ? formModel.des_monitori as string : null,
        des_nompet: formModel.des_nompet ? formModel.des_nompet as string : null,
        des_objeserv: formModel.des_objeserv ? formModel.des_objeserv as string : null,
        des_obsyrech: formModel.des_obsyrech ? formModel.des_obsyrech as string : null,
        des_telsolic: formModel.des_telsolic ? formModel.des_telsolic as string : null,
        des_telusura: formModel.des_telusura ? formModel.des_telusura as string : null,
        des_tiposser: formModel.des_tiposser ? formModel.des_tiposser as string : null,
        des_usura: formModel.des_usura ? formModel.des_usura as string : null,
        des_ususerv: formModel.des_ususerv ? formModel.des_ususerv as string : null,
        fec_monitori: formModel.fec_monitori ? formModel.fec_monitori as Date : null,
        qnu_ncargabd: formModel.qnu_ncargabd ? formModel.qnu_ncargabd as number : null,
        qnu_nfichero: formModel.qnu_nfichero ? formModel.qnu_nfichero as number : null,
        qnu_npaquete: formModel.qnu_npaquete ? formModel.qnu_npaquete as number : null,
        qnu_nscripts: formModel.qnu_nscripts ? formModel.qnu_nscripts as number : null,
        tim_entrega: formModel.tim_entrega ? formModel.tim_entrega as Date : null,
        tim_estimada: formModel.tim_estimada ? formModel.tim_estimada as Date : null,
        tim_finra: formModel.tim_finra ? formModel.tim_finra as Date : null,
        tim_implanta: formModel.tim_implanta ? formModel.tim_implanta as Date : null,
        tim_ultsol: formModel.tim_ultsol ? formModel.tim_ultsol as Date : null,
        xti_csancion: formModel.xti_csancion ? formModel.xti_csancion as string : null,

        tewokress: responsablesDeepCopy,
        tewokcmus: ctlModificacionesDeepCopy,
        tewokdpus: descProcesosDeepCopy,
        tewokpyas: paradaArranqueDeepCopy,
        tewokilus: logNombreDeepCopy,
        tewokmlus: logAccionDeepCopy,
        tewokamls: logMantenimientoDeepCopy,
        tewokrcos: reqComunicacionDeepCopy,
        tewokrmcs: reqMiddleDeepCopy,
        tewokmrcs: reqMiddleBDeepCopy,
        tewokofss: caracFSDeepCopy,
        tewokmfss: moniFSDeepCopy,
        tewokibds: bbddADeepCopy,
        tewokmbds: bbddBDeepCopy,
        tewokwebs: servidorDeepCopy,
        tewoktfis: ficherosDeepCopy,
        tewokbcks: backupsDeepCopy
      };
      return saveAplicacion;
    } else {
      return null;
    }
  }
//  TODO: Para el viernes!!!!!
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
