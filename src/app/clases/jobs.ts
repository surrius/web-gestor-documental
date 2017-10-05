//Objeto con el identificador clave de un Job para recuperar un unico dato por ID
export class JobID {
  cod_aplicaci: string;
  cod_jobpl: number;
}
  
//Tabla para la formulacion de la criticidad (TEWOKJAR)
export class Tewokjars {
  id: {
    cod_aplicaci: string;
    cod_jobpl: number;
    xti_accion: string;
    cod_error: number;
    xti_igualdad: string;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
}

// Esta tabla se crea como soporte para las altas, ya que la clase que se devuelve desde el
// html tiene esta estructura. Posteriormente se mapea a la clase Tewokjars para enviar a la BBDD 
export class TewokjarsAlta {
  cod_aplicaci: string;
  cod_jobpl: number;
  xti_accion: string;
  cod_error: number;
  xti_igualdad: string;
}

//Tabla 1 de descripcion de pasos (TEWOKJSO)
export class Tewokjsos {
  id: {
    cod_aplicaci: string;
    cod_jobpl: number;
    cod_pasosop: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_accesbd: string;
  des_entibd: string;
  des_fichentr: string;
  des_fichsali: string;
  des_paso: string;
}

//Tabla 2 de descripcion de pasos (TEWOKJCO)
export class Tewokjcos {
  id: {
    cod_aplicaci: string;
    cod_jobpl: number;
    cod_pasocond: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_paso: string;
  des_predece: string;
  des_rearra: string;
  des_sucesor: string;
}

//Tabla 3 de descripcion de pasos (TEWOKJIN)
export class Tewokjins {
  id: {
    cod_aplicaci: string;
    cod_jobpl: number;
    cod_pasoinc: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;
  
  des_incomjob: string;
  des_paso: string;
  xti_critinco: string;
}

// Clase que auna las anteriores para dar formato al modelo de datos
// que se corresponde al de la tabla jobs con el que trabajaremos
export class Jobs {
  id: {
    cod_aplicaci: string;
    cod_jobpl: number;
  };
  aud_timcrea: number;
  aud_timmodif: number;
  aud_usuario: string;
  cod_autouni: number;

  des_desjobpl: string;
  des_estrupl: string;
  des_gsoporte: string;
  des_libreori: string;
  des_maqeje: string;
  des_maqori: string;
  des_nombrjob: string;
  des_periojob: string;
  des_refdocjb: string;
  xti_critijob: string;
  tewokjsos: Tewokjsos[];
  tewokjins: Tewokjins[];
  tewokjars: Tewokjars[];
  tewokjcos: Tewokjcos[];

  constructor() {
    this.id = null;
    this.aud_timcrea = null;
    this.aud_timmodif = null;
    this.aud_usuario = null;
    this.cod_autouni = null;

    this.des_desjobpl = null;
    this.des_estrupl = null;
    this.des_gsoporte = null;
    this.des_libreori = null;
    this.des_maqeje = null;
    this.des_maqori = null;
    this.des_nombrjob = null;
    this.des_periojob = null;
    this.des_refdocjb = null;
    this.xti_critijob = null;
  }
}
//export class Jobs {
//  id: {
//    cod_aplicaci: string;
//    cod_jobpl: number;
//  };
//  aud_timcrea: number;
//  aud_timmodif: number;
//  aud_usuario: string;
//  cod_autouni: number;
//  
//  des_desjobpl: string;
//  des_estrupl: string;
//  des_gsoporte: string;
//  des_libreori: string;
//  des_maqeje: string;
//  des_maqori: string;
//  des_nombrjob: string;
//  des_periojob: string;
//  des_refdocjb: string;
//  xti_critijob: string;
//  tewokjsos: Tewokjsos[];
//  tewokjins: Tewokjins[];
//  tewokjars: Tewokjars[];
//  tewokjcos: Tewokjcos[];
//}
