//Campos de la tabla principal de Cadenas (TEWOKCDN)
export class CadenaPrincipal {
  cod_aplicaci: string;
  cod_cadenapl: number;
  des_refdocum: string;
  des_cadenapl: string;
  des_autor: string;
  fec_modifica: Date;
  des_equipocd: string;
  xti_periocdn: string;
  des_diaejecu: string;
  des_horaejec: string;
  xti_critical: string;
  des_rearran: string;
  des_interrel: string;
  des_descaden: string;
  des_incompat: string;
}

//Tabla de relación de scripts y dependencias (TEWOKCRD)
export class CadenaRelaciones {
  cod_aplicaci: string;
  cod_cadenapl: number;
  cod_secuuaa: number;
  des_scriptjb: string;
  des_scriptpr: string;
  des_cadenapr: string;
  des_scriptsu: string;
  des_cadenasu: string;
}

// Clase que auna las anteriores para dar formato al modelo de datos
// que se corresponde al de la tabla cadenas con el que trabajaremos
export class Cadenas {
  cadena_principal: CadenaPrincipal;
  cadena_relaciones: CadenaRelaciones[];
}