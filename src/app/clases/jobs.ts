export class Jobs {
  //Campos de la tabla principal de Jobs (TEWOKJOB)
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
    //Tabla 1 de descripcion de pasos (TEWOKJSO)
    cod_pasosop: number;
    des_paso_tb1: string;
    des_fichentr: string;
    des_fichsali: string;
    des_entibd: string;
    des_accesbd: string;
    //Tabla 2 de descripcion de pasos (TEWOKJCO)
    cod_pasocond: number;
    des_paso_tb2: string;
    des_predece: string;
    des_sucesor: string;
    des_rearra: string;
    //Tabla 3 de descripcion de pasos (TEWOKJIN)
    cod_pasoinc: number;
    des_paso_tb3: string;
    des_incomjob: string;
    des_critinco: string;
}