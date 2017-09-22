//Campos de la tabla principal de Jobs (TEWOKJOB)
export class JobsPrincipal {
  cod_aplicaci: string;
  cod_jobpl: number;
  des_refdocjb: string;
  des_nombrjob: string;
  des_gsoporte: string;
  des_maqori: string;
  des_libreori: string;
  des_desjobpl: string;
  des_estrupl: string;
  des_periojob: string;
  des_maqeje: string;
  xti_critijob: string;
}

//Tabla para la formulacion de la criticidad (TEWOKJAR)
export class JobsCriticidad {
  xti_accion: string;
  cod_error: number;
  xti_igualdad: string;
  
  constructor() {
    this.xti_accion = 'N';
    this.cod_error = 0;
    this.xti_igualdad = 'N';
  }
}

//Tabla 1 de descripcion de pasos (TEWOKJSO)
export class JobsPasos1 {
  cod_pasosop: number;
  des_paso: string;
  des_fichentr: string;
  des_fichsali: string;
  des_entibd: string;
  des_accesbd: string;
}

//Tabla 2 de descripcion de pasos (TEWOKJCO)
export class JobsPasos2 {
  cod_pasocond: number;
  des_paso: string;
  des_predece: string;
  des_sucesor: string;
  des_rearra: string;
}

//Tabla 3 de descripcion de pasos (TEWOKJIN)
export class JobsPasos3 {
  cod_pasoinc: number;
  des_paso: string;
  des_incomjob: string;
  des_critinco: string;
}

// Clase que auna las anteriores para dar formato al modelo de datos
// que se corresponde al de la tabla jobs con el que trabajaremos
export class Jobs {
  jobs_principal: JobsPrincipal;
  jobsCriticidad: JobsCriticidad[];
  pasos1: JobsPasos1[];
  pasos2: JobsPasos2[];
  pasos3: JobsPasos3[];
}

/*
  get consulta(): string {
    return JSON.stringify(this);
  }
*/