//Objeto con el identificador clave de una UUAA para recuperar un unico dato por ID
export class AppID {
  cod_aplicaci: string;
  cod_planuuaa: number;
}

//Campos de la tabla principal de Aplicaciones (TEWOKPUA)
//export class AplicacionesMain {
//  cod_aplicaci: string;
//  cod_user: string;
//  cod_userra: string;
//  des_codmonit: string;
//  des_detcon: string;
//  des_funcuuaa: string;
//  des_hmax: string;
//  des_hvalle: string;
//  des_monitori: string;
//  des_nompet: string;
//  des_objeserv: string;
//  des_obsyrech: string;
//  des_telsolic: string;
//  des_telusura: string;
//  des_tiposser: string;
//  des_usura: string;
//  des_ususerv: string;
//  fec_monitori: Date;
//  qnu_ncargabd: number;
//  qnu_nfichero: number;
//  qnu_npaquete: number;
//  qnu_nscripts: number;
//  tim_entrega: Date;
//  tim_estimada: Date;
//  tim_finra: Date;
//  tim_implanta: Date;
//  tim_ultsol: Date;
//  xti_csancion: string;
//}

//Tabla de Responsables(TEWOKRES)
export class Tewokress {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_user: string;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
        
  des_usucateg: string;
  des_nombyape: string;
  des_telinter: string;
  des_telexter: string;
}

//Tabla de Control de Modificaciones(TEWOKCMU)
export class Tewokcmus {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_versionm: string;
  fec_version: Date;
}

//Tabla de Descripcion de procesos(TEWOKDPU)
export class Tewokdpus {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_jobpl: string;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_acciopro: string;
  des_nombrepr: string;
  des_tipomoni: string;
  xti_severida: string;
}

//Tabla de Parada y arranque(TEWOKPYA)
export class Tewokpyas {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_arranque: string;
  des_paradaua: string;
}

//Tabla de tratamiento log (Nombre)(TEWOKILU)
export class Tewokilus {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_nomlog: string;
  des_funlog: string;
}

//Tabla de tratamiento log (Accion)(TEWOKMLU)
export class Tewokmlus {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_msjlog: string;
  xti_severida: string;
  des_acciopro: string;
}

//Tabla de tratamiento log (Mantenimiento)(TEWOKAML)
export class Tewokamls {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_nomlog: string;
  qnu_tammax: number;
  qnu_prevcrec: number;
  qnu_critrec: number;
  des_tratamie: string;
}

//Tabla de Requerimientos de comunicaciones (TEWOKRCO)
export class Tewokrcos {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_nomeq1: string;
  des_nomeq2: string;
  des_proccomu: string;
}

//Tabla de Requerimientos de Middleware 1 (TEWOKRMC)
export class Tewokrmcs {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_gestcola: string;
  des_nombrcol: string;
  xti_severida: string;
  qnu_profundi: number;
}

//Tabla de Requerimientos de Middleware 2 (TEWOKMRC)
export class Tewokmrcs {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_gestcola: string;
  des_canalmdl: string;
  des_colamdl: string;
}

//Tabla de Ocupacion de espacio - Caracteristicas FileSystem (TEWOKOFS)
export class Tewokofss {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_nomfs: string;
  qnu_espaesti: number;
  qnu_prevcrec: number;
  qnu_umbramax: number;
  des_tratamie: string;
}

//Tabla de Ocupacion de espacio - Monitorizacion FileSystem (TEWOKMFS)
export class Tewokmfss {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_nomfs: string;
  qnu_minor: number;
  qnu_critical: number;
  des_proccomu: string;
}

//Tabla de BBDD 1 (ORA o DB2) - (TEWOKIBD)
export class Tewokibds {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  xti_gestbbdd: string;
  cod_nombbdd: string;
  des_listenbd: string;
  des_usubd: string;
  des_proccomu: string;
}

//Tabla de BBDD 2 (Instancias) - (TEWOKMBD)
export class Tewokmbds {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  xti_gestbbdd: string;
  cod_nombbdd: string;
  des_instabd: string;
  cod_tablbbdd: string;
  qnu_severo: number;
  qnu_critical: number;
  des_proccomu: string;
}

//Tabla de Servidores WAS/WEB - (TEWOKWEB)
export class Tewokwebs {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  xti_serviapl: string;
  des_instaweb: string;
  des_proccomu: string;
}

//Tabla de transmision de ficheros (TEWOKTFI)
export class Tewoktfis {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_maqori: string;
  des_scriptor: string;
  des_fichentr: string;
  des_maqdest: string;
  des_scriptde: string;
  des_fichdest: string;
  des_proccomu: string;
}

//Tabla de transmision de backups (TEWOKBCK)
export class Tewokbcks {
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  xti_gestbbdd: string;
  xti_backup: string;
  cod_periodo: string;
  des_ciclovid: string;
}

// Clase que auna las anteriores para dar formato al modelo de datos
// que se corresponde al de la tabla cadenas con el que trabajaremos
export class Aplicaciones {
//  aplicacionesMain: AplicacionesMain;
  id: {
    cod_aplicaci: string;
    cod_planuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  cod_user: string;
  cod_userra: string;
  des_codmonit: string;
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
  des_usura: string;
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
  des_detcon: string;
  tewokress: Tewokress[];
  tewokcmus: Tewokcmus[];
  tewokdpus: Tewokdpus[];
  tewokpyas: Tewokpyas[];
  tewokilus: Tewokilus[];
  tewokmlus: Tewokmlus[];
  tewokamls: Tewokamls[];
  tewokrcos: Tewokrcos[];
  tewokrmcs: Tewokrmcs[];
  tewokmrcs: Tewokmrcs[];
  tewokofss: Tewokofss[];
  tewokmfss: Tewokmfss[];
  tewokibds: Tewokibds[];
  tewokmbds: Tewokmbds[];
  tewokwebs: Tewokwebs[];
  tewoktfis: Tewoktfis[];
  tewokbcks: Tewokbcks[];
  
  constructor() {
    this.id = null;
    this.aud_timcrea = null;
    this.aud_timmodif = null;
    this.aud_usuario = null;
    this.cod_autouni = null;

    this.cod_user = null;
    this.cod_userra = null;
    this.des_codmonit = null;
    this.des_funcuuaa = null;
    this.des_hmax = null;
    this.des_hvalle = null;
    this.des_monitori = null;
    this.des_nompet = null;
    this.des_objeserv = null;
    this.des_obsyrech = null;
    this.des_telsolic = null;
    this.des_telusura = null;
    this.des_tiposser = null;
    this.des_usura = null;
    this.des_ususerv = null;
    this.fec_monitori = null;
    this.qnu_ncargabd = null;
    this.qnu_nfichero = null;
    this.qnu_npaquete = null;
    this.qnu_nscripts = null;
    this.tim_entrega = null;
    this.tim_estimada = null;
    this.tim_finra = null;
    this.tim_implanta = null;
    this.tim_ultsol = null;
    this.xti_csancion = null;
    this.des_detcon = null;
  }

}