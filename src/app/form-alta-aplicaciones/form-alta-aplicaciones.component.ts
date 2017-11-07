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

  // Variables para descargar PDF
  link: string;
  
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
        this.link = this.creaLinkPDF();
        console.log(this.link);
      }
    });
  }
  
  //Metodo que decidirá si se muestran o no las partes del alta
  sw_alta_consulta(oper: string): boolean {
    let resultado: boolean = false;
    switch (oper) {
      case 'alta_nueva':
        resultado = true;
        this.titulo = 'Alta de nueva Aplicaci\u00F3n ';
        break;        
      case 'modificacion':
        resultado = true;
        this.titulo = 'Modificaci\u00F3n de Aplicaci\u00F3n ';
        break;
      case 'copia':
        resultado = true;
        this.titulo = 'Copia de Aplicaci\u00F3n. Nueva: ';
        break;         
      default:
        this.titulo = 'Consulta de Aplicaci\u00F3n ';
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
      
      des_nomuuaa: ['', [Validators.required]],
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
      responsables: this.fb.array([]),
      ctlModificaciones: this.fb.array([]),
      descProcesos: this.fb.array([]),
      paradaArranque: this.fb.array([]),
      logNombre: this.fb.array([]),
      logAccion: this.fb.array([]),
      logMantenimiento: this.fb.array([]),
      reqComunicacion: this.fb.array([]),
      reqMiddle: this.fb.array([]),
      reqMiddleB: this.fb.array([]),
      caracFS: this.fb.array([]),
      moniFS: this.fb.array([]),
      bbddA: this.fb.array([]),
      bbddB: this.fb.array([]),
      servidor: this.fb.array([]),
      ficheros: this.fb.array([]),
      backups: this.fb.array([])
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
      cod_secuuaa: [''],
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
      
      xti_gestfibd: [''],
      xti_backup: [''],
      xti_periodo: [''],
      des_ciclovid: [''],
      des_identbck: ['']
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
    this.backups.push(this.initBackups());
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

    // Mapeo manual de los campos del formulario y la clase AppPrincipal
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
    let reqMiddleDeepCopy: Tewokrmcs[] = this.validarTewokrmcs(formModel.reqMiddle);
    
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

        des_nomuuaa: formModel.des_nomuuaa ? formModel.des_nomuuaa as string : null,
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
  
  //Mapeo de campos y validaciones previas al envio de datos al servidor
  validarTewokress(form: any) {
    let array_resultado: Tewokress[] = new Array<Tewokress>();
    
    for (let elem of form) {
      let resultado: Tewokress = new Tewokress();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_user: elem.cod_user? elem.cod_user : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_usucateg = elem.des_usucateg? elem.des_usucateg : null;
      resultado.des_nombyape = elem.des_nombyape? elem.des_nombyape : null;
      resultado.des_telinter = elem.des_telinter? elem.des_telinter : null;
      resultado.des_telexter = elem.des_telexter? elem.des_telexter : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokcmus(form: any) {
    let array_resultado: Tewokcmus[] = new Array<Tewokcmus>();
    
    for (let elem of form) {
      let resultado: Tewokcmus = new Tewokcmus();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_versionm = elem.des_versionm? elem.des_versionm : null;
      resultado.fec_version = elem.fec_version? elem.fec_version : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokdpus(form: any) {
    let array_resultado: Tewokdpus[] = new Array<Tewokdpus>();
    
    for (let elem of form) {
      let resultado: Tewokdpus = new Tewokdpus();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_acciopro = elem.des_acciopro? elem.des_acciopro : null;
      resultado.des_nombrepr = elem.des_nombrepr? elem.des_nombrepr : null;
      resultado.des_tipomoni = elem.des_tipomoni? elem.des_tipomoni : null;
      resultado.xti_severida = elem.xti_severida? elem.xti_severida : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokpyas(form: any) {
    let array_resultado: Tewokpyas[] = new Array<Tewokpyas>();
    
    for (let elem of form) {
      let resultado: Tewokpyas = new Tewokpyas();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_arranque = elem.des_arranque? elem.des_arranque : null;
      resultado.des_paradaua = elem.des_paradaua? elem.des_paradaua : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokilus(form: any) {
    let array_resultado: Tewokilus[] = new Array<Tewokilus>();
    
    for (let elem of form) {
      let resultado: Tewokilus = new Tewokilus();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_nomlog = elem.des_nomlog? elem.des_nomlog : null;
      resultado.des_funlog = elem.des_funlog? elem.des_funlog : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokmlus(form: any) {
    let array_resultado: Tewokmlus[] = new Array<Tewokmlus>();
    
    for (let elem of form) {
      let resultado: Tewokmlus = new Tewokmlus();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_msjlog = elem.des_msjlog? elem.des_msjlog : null;
      resultado.xti_severida = elem.xti_severida? elem.xti_severida : null;
      resultado.des_acciopro = elem.des_acciopro? elem.des_acciopro : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokamls(form: any) {
    let array_resultado: Tewokamls[] = new Array<Tewokamls>();
    
    for (let elem of form) {
      let resultado: Tewokamls = new Tewokamls();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_nomlog = elem.des_nomlog? elem.des_nomlog : null;
      resultado.qnu_tammax = elem.qnu_tammax? elem.qnu_tammax : null;
      resultado.qnu_prevcrec = elem.qnu_prevcrec? elem.qnu_prevcrec : null;
      resultado.qnu_critrec = elem.qnu_critrec? elem.qnu_critrec : null;
      resultado.des_tratamie = elem.des_tratamie? elem.des_tratamie : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokrcos(form: any) {
    let array_resultado: Tewokrcos[] = new Array<Tewokrcos>();
    
    for (let elem of form) {
      let resultado: Tewokrcos = new Tewokrcos();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_nomeq1 = elem.des_nomeq1? elem.des_nomeq1 : null;
      resultado.des_nomeq2 = elem.des_nomeq2? elem.des_nomeq2 : null;
      resultado.des_proccomu = elem.des_proccomu? elem.des_proccomu : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokrmcs(form: any) {
    let array_resultado: Tewokrmcs[] = new Array<Tewokrmcs>();
    
    for (let elem of form) {
      let resultado: Tewokrmcs = new Tewokrmcs();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_gestcola = elem.des_gestcola? elem.des_gestcola : null;
      resultado.des_nombrcol = elem.des_nombrcol? elem.des_nombrcol : null;
      resultado.xti_severida = elem.xti_severida? elem.xti_severida : null;
      resultado.qnu_profundi = elem.qnu_profundi? elem.qnu_profundi : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokmrcs(form: any) {
    let array_resultado: Tewokmrcs[] = new Array<Tewokmrcs>();
    
    for (let elem of form) {
      let resultado: Tewokmrcs = new Tewokmrcs();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_gestcola = elem.des_gestcola? elem.des_gestcola : null;
      resultado.des_canalmdl = elem.des_canalmdl? elem.des_canalmdl : null;
      resultado.des_colamdl = elem.des_colamdl? elem.des_colamdl : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokofss(form: any) {
    let array_resultado: Tewokofss[] = new Array<Tewokofss>();
    
    for (let elem of form) {
      let resultado: Tewokofss = new Tewokofss();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_nomfs = elem.des_nomfs? elem.des_nomfs : null;
      resultado.qnu_espaesti = elem.qnu_espaesti? elem.qnu_espaesti : null;
      resultado.qnu_prevcrec = elem.qnu_prevcrec? elem.qnu_prevcrec : null;
      resultado.qnu_umbramax = elem.qnu_umbramax? elem.qnu_umbramax : null;
      resultado.des_tratamie = elem.des_tratamie? elem.des_tratamie : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokmfss(form: any) {
    let array_resultado: Tewokmfss[] = new Array<Tewokmfss>();
    
    for (let elem of form) {
      let resultado: Tewokmfss = new Tewokmfss();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_nomfs = elem.des_nomfs? elem.des_nomfs : null;
      resultado.qnu_minor = elem.qnu_minor? elem.qnu_minor : null;
      resultado.qnu_critical = elem.qnu_critical? elem.qnu_critical : null;
      resultado.des_proccomu = elem.des_proccomu? elem.des_proccomu : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokibds(form: any) {
    let array_resultado: Tewokibds[] = new Array<Tewokibds>();
    
    for (let elem of form) {
      let resultado: Tewokibds = new Tewokibds();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.xti_gestbbdd = elem.xti_gestbbdd? elem.xti_gestbbdd : null;
      resultado.cod_nombbdd = elem.cod_nombbdd? elem.cod_nombbdd : null;
      resultado.des_listenbd = elem.des_listenbd? elem.des_listenbd : null;
      resultado.des_usubd = elem.des_usubd? elem.des_usubd : null;
      resultado.des_proccomu = elem.des_proccomu? elem.des_proccomu : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokmbds(form: any) {
    let array_resultado: Tewokmbds[] = new Array<Tewokmbds>();
    
    for (let elem of form) {
      let resultado: Tewokmbds = new Tewokmbds();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.xti_gestbbdd = elem.xti_gestbbdd? elem.xti_gestbbdd : null;
      resultado.cod_nombbdd = elem.cod_nombbdd? elem.cod_nombbdd : null;
      resultado.des_instabd = elem.des_instabd? elem.des_instabd : null;
      resultado.cod_tablbbdd = elem.cod_tablbbdd? elem.cod_tablbbdd : null;
      resultado.qnu_severo = elem.qnu_severo? elem.qnu_severo : null;
      resultado.qnu_critical = elem.qnu_critical? elem.qnu_critical : null;
      resultado.des_proccomu = elem.des_proccomu? elem.des_proccomu : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokwebs(form: any) {
    let array_resultado: Tewokwebs[] = new Array<Tewokwebs>();
    
    for (let elem of form) {
      let resultado: Tewokwebs = new Tewokwebs();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.xti_serviapl = elem.xti_serviapl? elem.xti_serviapl : null;
      resultado.des_instaweb = elem.des_instaweb? elem.des_instaweb : null;
      resultado.des_proccomu = elem.des_proccomu? elem.des_proccomu : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewoktfis(form: any) {
    let array_resultado: Tewoktfis[] = new Array<Tewoktfis>();
    
    for (let elem of form) {
      let resultado: Tewoktfis = new Tewoktfis();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.des_maqori = elem.des_maqori? elem.des_maqori : null;
      resultado.des_scriptor = elem.des_scriptor? elem.des_scriptor : null;
      resultado.des_fichentr = elem.des_fichentr? elem.des_fichentr : null;
      resultado.des_maqdest = elem.des_maqdest? elem.des_maqdest : null;
      resultado.des_scriptde = elem.des_scriptde? elem.des_scriptde : null;
      resultado.des_fichdest = elem.des_fichdest? elem.des_fichdest : null;
      resultado.des_proccomu = elem.des_proccomu? elem.des_proccomu : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  validarTewokbcks(form: any) {
    let array_resultado: Tewokbcks[] = new Array<Tewokbcks>();
    
    for (let elem of form) {
      let resultado: Tewokbcks = new Tewokbcks();
      
      resultado.id = {
        cod_aplicaci: elem.cod_aplicaci? elem.cod_aplicaci : null,
        cod_planuuaa: elem.cod_planuuaa? elem.cod_planuuaa : null,
        cod_secuuaa: elem.cod_secuuaa? elem.cod_secuuaa : null
      };
      resultado.aud_timcrea = elem.aud_timcrea? elem.aud_timcrea : null;
      resultado.aud_timmodif = elem.aud_timmodif? elem.aud_timmodif : null;
      resultado.aud_usuario = elem.aud_usuario? elem.aud_usuario : null;
      resultado.cod_autouni = elem.cod_autouni? elem.cod_autouni : null;

      resultado.xti_gestfibd = elem.xti_gestfibd? elem.xti_gestfibd : null;
      resultado.xti_backup = elem.xti_backup? elem.xti_backup : null;
      resultado.xti_periodo = elem.xti_periodo? elem.xti_periodo : null;
      resultado.des_ciclovid = elem.des_ciclovid? elem.des_ciclovid : null;
      resultado.des_identbck = elem.des_identbck? elem.des_identbck : null;
      
      array_resultado.push(resultado);
    }
    
    return array_resultado;
  }
  
  // Metodo que invoca al servicio para dar de alta una Aplicacion
  altaNuevaAplicacion(aplicacion: Aplicaciones) {
    this.bbddAplicacionesService.createAplicacion(aplicacion)
      .subscribe(data => {
        this.aplicaciones.id.cod_aplicaci = data.cod_aplicaci;
        this.aplicaciones.id.cod_planuuaa = data.cod_planuuaa;
        console.log('Resultado Alta aplicacion: ' + this.statusCode); //Cod correcto = 201
        alert('Alta efectuada correctamente');
        this.altaAppsForm.disable();
        this.showAlta = this.sw_alta_consulta('consulta');
        this.link = this.creaLinkPDF();
      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error al solicitar el alta.');      
      });
  }
  
  // Metodo que invoca al servicio para dar de modificar una Aplicacion
  modificaAplicacion(aplicacion: Aplicaciones) {
    this.bbddAplicacionesService.updateAplicacion(aplicacion)
      .subscribe(data => {
        this.aplicaciones.id.cod_aplicaci = data.cod_aplicaci;
        this.aplicaciones.id.cod_planuuaa = data.cod_planuuaa;
        console.log('Resultado Modificacion Aplicacion: ' + this.statusCode); //Cod correcto = 201
        alert('Aplicacion modificada correctamente');
        this.altaAppsForm.disable();
        this.showAlta = this.sw_alta_consulta('consulta');
        this.link = this.creaLinkPDF();
      },
      errorCode => {
        this.statusCode = errorCode;
        alert('Error al modificar aplicacion.');      
      });
  }
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  /*                          METODOS USADOS PARA LA CONSULTA DE DATOS                             */
  /* ********************************************************************************************* */
  /* ********************************************************************************************* */
  // Metodo para buscar una Aplicacion por su ID unica en la BBDD y mostrarlo en la Consulta/Modif
  bdBuscaAplicacionId(aplicacion: Aplicaciones) {
    let appID = new AppID();
    appID.cod_aplicaci = aplicacion.id.cod_aplicaci;
    appID.cod_planuuaa = aplicacion.id.cod_planuuaa;
    
    this.bbddAplicacionesService.getFindAplicacionId(appID).subscribe(
      data => this.informaFormulario(data),
      error => { 
        this.errorMessage = <any>error;
        alert('Error al recuperar datos desde el servidor');
        this.goBack();
      }
    );
  }
  
  // Informamos todos los campos del formulario con los datos recuperados del servidor
  informaFormulario(data: Aplicaciones) {
    if (this.operacion == 'copia') {
      data.id.cod_aplicaci = null;
      data.id.cod_planuuaa = null;
      data.aud_timcrea = null;
      data.aud_timmodif = null;
      data.aud_usuario = null;
      data.cod_autouni = null;
    }

    this.altaAppsForm.get('cod_aplicaci').setValue(data.id.cod_aplicaci);
    this.altaAppsForm.get('cod_planuuaa').setValue(data.id.cod_planuuaa);
    this.altaAppsForm.get('aud_timcrea').setValue(data.aud_timcrea);
    this.altaAppsForm.get('aud_timmodif').setValue(data.aud_timmodif);
    this.altaAppsForm.get('aud_usuario').setValue(data.aud_usuario);
    this.altaAppsForm.get('cod_autouni').setValue(data.cod_autouni);
    
    this.altaAppsForm.get('des_nomuuaa').setValue(data.des_nomuuaa);
    this.altaAppsForm.get('cod_user').setValue(data.cod_user);
    this.altaAppsForm.get('cod_userra').setValue(data.cod_userra);
    this.altaAppsForm.get('des_codmonit').setValue(data.des_codmonit);
    this.altaAppsForm.get('des_funcuuaa').setValue(data.des_funcuuaa);
    this.altaAppsForm.get('des_hmax').setValue(data.des_hmax);
    this.altaAppsForm.get('des_hvalle').setValue(data.des_hvalle);
    this.altaAppsForm.get('des_monitori').setValue(data.des_monitori);
    this.altaAppsForm.get('des_nompet').setValue(data.des_nompet);
    this.altaAppsForm.get('des_objeserv').setValue(data.des_objeserv);
    this.altaAppsForm.get('des_obsyrech').setValue(data.des_obsyrech);
    this.altaAppsForm.get('des_telsolic').setValue(data.des_telsolic);
    this.altaAppsForm.get('des_telusura').setValue(data.des_telusura);
    this.altaAppsForm.get('des_tiposser').setValue(data.des_tiposser);
    this.altaAppsForm.get('des_usura').setValue(data.des_usura);
    this.altaAppsForm.get('des_ususerv').setValue(data.des_ususerv);
    this.altaAppsForm.get('fec_monitori').setValue(data.fec_monitori);
    this.altaAppsForm.get('qnu_ncargabd').setValue(data.qnu_ncargabd);
    this.altaAppsForm.get('qnu_nfichero').setValue(data.qnu_nfichero);
    this.altaAppsForm.get('qnu_npaquete').setValue(data.qnu_npaquete);
    this.altaAppsForm.get('qnu_nscripts').setValue(data.qnu_nscripts);
    this.altaAppsForm.get('tim_entrega').setValue(data.tim_entrega);
    this.altaAppsForm.get('tim_estimada').setValue(data.tim_estimada);
    this.altaAppsForm.get('tim_finra').setValue(data.tim_finra);
    this.altaAppsForm.get('tim_implanta').setValue(data.tim_implanta);
    this.altaAppsForm.get('tim_ultsol').setValue(data.tim_ultsol);
    this.altaAppsForm.get('xti_csancion').setValue(data.xti_csancion);
    this.altaAppsForm.get('des_detcon').setValue(data.des_detcon);
    
    // Se informa cada uno de los formArray con los valores recuperados de la BBDD. 
    // Previamente, se elimina el primer registro que se ha creado con el formulario
    // para que no aparezca vacio en la web
    this.responsables.removeAt(0);
    for (let elem of data.tewokress) {
      let formTewokress = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        cod_user: elem.id.cod_user,        
        des_usucateg: elem.des_usucateg,
        des_nombyape: elem.des_nombyape,
        des_telinter: elem.des_telinter,
        des_telexter: elem.des_telexter
      });
      this.responsables.push(formTewokress);
    }
    
    this.ctlModificaciones.removeAt(0);
    for (let elem of data.tewokcmus) {
      let formTewokcmus = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_versionm: elem.des_versionm,
        fec_version: elem.fec_version
      });
      this.ctlModificaciones.push(formTewokcmus);
    }
    
    this.descProcesos.removeAt(0);
    for (let elem of data.tewokdpus) {
      let formTewokdpus = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_acciopro: elem.des_acciopro,
        des_nombrepr: elem.des_nombrepr,
        des_tipomoni: elem.des_tipomoni,
        xti_severida: elem.xti_severida
      });
      this.descProcesos.push(formTewokdpus);
    }
    
    this.paradaArranque.removeAt(0);
    for (let elem of data.tewokpyas) {
      let formTewokpyas = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_arranque: elem.des_arranque,
        des_paradaua: elem.des_paradaua
      });
      this.paradaArranque.push(formTewokpyas);
    }
    
    this.logNombre.removeAt(0);
    for (let elem of data.tewokilus) {
      let formTewokilus = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_nomlog: elem.des_nomlog,
        des_funlog: elem.des_funlog
      });
      this.logNombre.push(formTewokilus);
    }
    
    this.logAccion.removeAt(0);
    for (let elem of data.tewokmlus) {
      let formTewokmlus = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_msjlog: elem.des_msjlog,
        xti_severida: elem.xti_severida,
        des_acciopro: elem.des_acciopro
      });
      this.logAccion.push(formTewokmlus);
    }
    
    this.logMantenimiento.removeAt(0);
    for (let elem of data.tewokamls) {
      let formTewokamls = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_nomlog: elem.des_nomlog,
        qnu_tammax: elem.qnu_tammax,
        qnu_prevcrec: elem.qnu_prevcrec,
        qnu_critrec: elem.qnu_critrec,
        des_tratamie: elem.des_tratamie
      });
      this.logMantenimiento.push(formTewokamls);
    }
    
    this.reqComunicacion.removeAt(0);
    for (let elem of data.tewokrcos) {
      let formTewokrcos = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_nomeq1: elem.des_nomeq1,
        des_nomeq2: elem.des_nomeq2,
        des_proccomu: elem.des_proccomu
      });
      this.reqComunicacion.push(formTewokrcos);
    }
    
    this.reqMiddle.removeAt(0);
    for (let elem of data.tewokrmcs) {
      let formTewokrmcs = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_gestcola: elem.des_gestcola,
        des_nombrcol: elem.des_nombrcol,
        xti_severida: elem.xti_severida,
        qnu_profundi: elem.qnu_profundi
      });
      this.reqMiddle.push(formTewokrmcs);
    }
    
    this.reqMiddleB.removeAt(0);
    for (let elem of data.tewokmrcs) {
      let formTewokmrcs = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_gestcola: elem.des_gestcola,
        des_canalmdl: elem.des_canalmdl,
        des_colamdl: elem.des_colamdl
      });
      this.reqMiddleB.push(formTewokmrcs);
    }
    
    this.caracFS.removeAt(0);
    for (let elem of data.tewokofss) {
      let formTewokofss = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_nomfs: elem.des_nomfs,
        qnu_espaesti: elem.qnu_espaesti,
        qnu_prevcrec: elem.qnu_prevcrec,
        qnu_umbramax: elem.qnu_umbramax,
        des_tratamie: elem.des_tratamie
      });
      this.caracFS.push(formTewokofss);
    }
    
    this.moniFS.removeAt(0);
    for (let elem of data.tewokmfss) {
      let formTewokmfss = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_nomfs: elem.des_nomfs,
        qnu_minor: elem.qnu_minor,
        qnu_critical: elem.qnu_critical,
        des_proccomu: elem.des_proccomu
      });
      this.moniFS.push(formTewokmfss);
    }
    
    this.bbddA.removeAt(0);
    for (let elem of data.tewokibds) {
      let formTewokibds = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        xti_gestbbdd: elem.xti_gestbbdd,
        cod_nombbdd: elem.cod_nombbdd,
        des_listenbd: elem.des_listenbd,
        des_usubd: elem.des_usubd,
        des_proccomu: elem.des_proccomu
      });
      this.bbddA.push(formTewokibds);
    }
    
    this.bbddB.removeAt(0);
    for (let elem of data.tewokmbds) {
      let formTewokmbds = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        xti_gestbbdd: elem.xti_gestbbdd,
        cod_nombbdd: elem.cod_nombbdd,
        des_instabd: elem.des_instabd,
        cod_tablbbdd: elem.cod_tablbbdd,
        qnu_severo: elem.qnu_severo,
        qnu_critical: elem.qnu_critical,
        des_proccomu: elem.des_proccomu
      });
      this.bbddB.push(formTewokmbds);
    }
    
    this.servidor.removeAt(0);
    for (let elem of data.tewokwebs) {
      let formTewokwebs = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        xti_serviapl: elem.xti_serviapl,
        des_instaweb: elem.des_instaweb,
        des_proccomu: elem.des_proccomu
      });
      this.servidor.push(formTewokwebs);
    }
    
    this.ficheros.removeAt(0);
    for (let elem of data.tewoktfis) {
      let formTewoktfis = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        des_maqori: elem.des_maqori,
        des_scriptor: elem.des_scriptor,
        des_fichentr: elem.des_fichentr,
        des_maqdest: elem.des_maqdest,
        des_scriptde: elem.des_scriptde,
        des_fichdest: elem.des_fichdest,
        des_proccomu: elem.des_proccomu
      });
      this.ficheros.push(formTewoktfis);
    }
    
    this.backups.removeAt(0);
    for (let elem of data.tewokbcks) {
      let formTewokbcks = this.fb.group({
        cod_aplicaci: elem.id.cod_aplicaci,
        cod_planuuaa: elem.id.cod_planuuaa,
        cod_secuuaa: elem.id.cod_secuuaa,        
        aud_timcrea: elem.aud_timcrea,
        aud_timmodif: elem.aud_timmodif,
        aud_usuario: elem.aud_usuario,
        cod_autouni: elem.cod_autouni,
        
        xti_gestfibd: elem.xti_gestfibd,
        xti_backup: elem.xti_backup,
        xti_periodo: elem.xti_periodo,
        des_ciclovid: elem.des_ciclovid,
        des_identbck: elem.des_identbck
      });
      this.backups.push(formTewokbcks);
    }
    
    // Se desactiva o no el formulario en función de la petición
//    this.altaAppsForm.get('cod_aplicaci').disable();
    if (!this.showAlta) {
      this.altaAppsForm.disable();
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

  creaLinkPDF(): string {
    let appID = new AppID();
    appID.cod_aplicaci = this.aplicaciones.id.cod_aplicaci;
    appID.cod_planuuaa = this.aplicaciones.id.cod_planuuaa;

    return this.bbddAplicacionesService.baseURL + 'aplicacion/generaPDF?id=' + JSON.stringify(appID);
  }
  
  /*download() {
    let appID = new AppID();
    appID.cod_aplicaci = this.aplicaciones.id.cod_aplicaci;
    appID.cod_planuuaa = this.aplicaciones.id.cod_planuuaa;

    console.log('Va con appID: ' + JSON.stringify(appID));

    this.bbddAplicacionesService.getAplicacionPDF(appID)
      .subscribe(successCode => {
        this.statusCode = +successCode;
      },
      errorCode => {
        this.statusCode = errorCode;
      });

    /*let pdf = new jsPDF('l', 'pt', 'a4');
    let options = {
    pagesplit: true,
    background: '#fff'
    };  
    
    pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
    pdf.save(this.altaAppsForm.get('cod_aplicaci').value + ".pdf");
    });
  }*/
  
}
