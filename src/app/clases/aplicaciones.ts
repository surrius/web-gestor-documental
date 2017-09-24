//Campos de la tabla principal de Aplicaciones (TEWOKPUA)
export class AplicacionesMain {
//  aud_timcrea: Date;
//  aud_timmodif: Date;
//  aud_usuario: string;
//  cod_autouni: number;
  cod_aplicaci: string;
  cod_user: string;
  cod_userra: string;
  des_codmonit: string;
  des_detcon: string;
  des_funcuuaa: string;
  des_hmax: string;
  des_hvalle: string;
  des_monitori: string;
  des_nompet: string;
  des_objeserv: string;
  des_obsyrech: string;
  des_telsolic: string;
  des_telusura: string;
  des_tiposser: string;
//  des_usura: string;
  des_ususerv: string;
  fec_monitori: Date;
  qnu_ncargabd: number;
  qnu_nfichero: number;
  qnu_npaquete: number;
  qnu_nscripts: number;
  tim_entrega: Date;
  tim_estimada: Date;
  tim_finra: Date;
  tim_implanta: Date;
  tim_ultsol: Date;
  xti_csancion: string;
}

//Tabla de Control de Modificaciones(TEWOKCMU)
//??????????????????TODO: ?????

//Tabla de Control de Modificaciones(TEWOKCMU)
export class Tewokcmu {
  des_versionm: string;
  fec_version: Date;
}

//Tabla de Descripcion de procesos(TEWOKDPU)
export class Tewokdpu {
  des_acciopro: string;
  des_nombrepr: string;
  des_tipomoni: string;
  xti_severida: string;
}

//Tabla de Parada y arranque(TEWOKPYA)
export class Tewokpya {
  des_arranque: string;
  des_paradaua: string;
}

//Tabla de tratamiento log (Nombre)(TEWOKILU)
export class Tewokilu {
  des_nomlog: string;
  des_funlog: string;
}

//Tabla de tratamiento log (Accion)(TEWOKMLU)
export class Tewokmlu {
  des_msjlog: string;
  xti_severida: string;
  des_acciopro: string;
}

//Tabla de tratamiento log (Mantenimiento)(TEWOKAML)
export class Tewokaml {
  des_nomlog: string;
  qnu_tammax: number;
  qnu_prevcrec: number;
  qnu_critrec: number;
  des_tratamie: string;
}

//Tabla de Requerimientos de comunicaciones (TEWOKRCO)
export class Tewokrco {
  des_nomeq1: string;
  des_nomeq2: string;
  des_proccomu: string;
}

//Tabla de Requerimientos de Middleware 1 (TEWOKRMC)
export class Tewokrmc {
  des_gestcola: string;
  des_nombrcol: string;
  xti_severida: string;
  qnu_profundi: number;
}

//Tabla de Requerimientos de Middleware 2 (TEWOKMRC)
export class Tewokmrc {
  des_gestcola: string;
  des_canalmdl: string;
  des_colamdl: string;
}

//Tabla de Requerimientos QA-RUN(TEWOKMRC)
//export class Tewokmrc {
//  des_gestcola: string;
//  des_canalmdl: string;
//  des_colamdl: string;
//}

//Tabla de Ocupacion de espacio - Caracteristicas FileSystem (TEWOKOFS)
export class Tewokofs {
  des_nomfs: string;
  qnu_espaesti: number;
  qnu_prevcrec: number;
  qnu_umbramax: number;
  des_tratamie: string;
}

//Tabla de Ocupacion de espacio - Monitorizacion FileSystem (TEWOKMFS)
export class Tewokmfs {
  des_nomfs: string;
  qnu_minor: number;
  qnu_critical: number;
  des_proccomu: string;
}

//Tabla de transmision de ficheros (TEWOKTFI)
export class Tewoktfi {
  des_maqori: string;
  des_scriptor: string;
  des_fichentr: string;
  des_maqdest: string;
  des_scriptde: string;
  des_fichdest: string;
  des_proccomu: string;
}

// Clase que auna las anteriores para dar formato al modelo de datos
// que se corresponde al de la tabla cadenas con el que trabajaremos
export class Aplicaciones {
  aplicacionesMain: AplicacionesMain;
  //Falta la tabla de responsables
  tewokcmu: Tewokcmu[];
  tewokdpu: Tewokdpu[];
  tewokpya: Tewokpya[];
  tewokilu: Tewokilu[];
  tewokmlu: Tewokmlu[];
  tewokaml: Tewokaml[];
  tewokrco: Tewokrco[];
  tewokrmc: Tewokrmc[];
  tewokmrc: Tewokmrc[];
  tewokofs: Tewokofs[];
  tewokmfs: Tewokmfs[];
  tewoktfi: Tewoktfi[];
}