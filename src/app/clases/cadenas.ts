//Objeto con el identificador clave de un Job para recuperar un unico dato por ID
export class CdnID {
  cod_aplicaci: string;
  cod_cadenapl: number;
}

//Campos de la tabla principal de Cadenas (TEWOKCDN)
//export class CadenaPrincipal {
//  id: {
//    cod_aplicaci: string;
//    cod_cadenapl: number;
//  };
//  aud_timcrea: number;
//  aud_timmodif: number;
//  aud_usuario: string;
//  cod_autouni: number;
//  des_autor: string;
//  des_cadenapl: string;
//  des_descaden: string;
//  des_diaejecu: string;
//  des_equipocd: string;
//  des_horaejec: string;
//  des_incompat: string;
//  des_interrel: string;
//  des_rearran: string;
//  des_refdocum: string;
//  fec_modifica: Date;
//  xti_critical: string;
//  xti_periocdn: string;
//}

//Tabla de relación de scripts y dependencias (TEWOKCRD)
export class Tewokcrds {
  id: {
    cod_aplicaci: string;
    cod_cadenapl: number;
    cod_secuuaa: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  des_cadenapr: string;
  des_cadenasu: string;
  des_scriptjb: string;
  des_scriptpr: string;
  des_scriptsu: string;
}

// Clase que auna las anteriores para dar formato al modelo de datos
// que se corresponde al de la tabla cadenas con el que trabajaremos
export class Cadenas {
  id: {
    cod_aplicaci: string;
    cod_cadenapl: number;
  };
  
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_autor: string;
  des_cadenapl: string;
  des_descaden: string;
  des_diaejecu: string;
  des_equipocd: string;
  des_horaejec: string;
  des_incompat: string;
  des_interrel: string;
  des_rearran: string;
  des_refdocum: string;
  fec_modifica: Date;
  xti_critical: string;
  xti_periocdn: string;
  
  tewokcrds: Tewokcrds[];
  
  constructor() {
    this.id = null;
    
    this.aud_timcrea = null;
    this.aud_timmodif = null;
    this.aud_usuario = null;
    this.cod_autouni = null;

    this.des_autor = null;
    this.des_cadenapl = null;
    this.des_descaden = null;
    this.des_diaejecu = null;
    this.des_equipocd = null;
    this.des_horaejec = null;
    this.des_incompat = null;
    this.des_interrel = null;
    this.des_rearran = null;
    this.des_refdocum = null;
    this.fec_modifica = null;
    this.xti_critical = null;
    this.xti_periocdn = null;
  }
  
}