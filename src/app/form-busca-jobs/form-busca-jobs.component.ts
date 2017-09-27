import { Component, OnInit } from '@angular/core';

import { JobsPrincipal } from '../clases/jobs';
import { BbddJobsService } from '../services/bbdd-jobs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-busca-jobs',
  templateUrl: './form-busca-jobs.component.html',
  styleUrls: ['./form-busca-jobs.component.css']
})
  
export class FormBuscaJobsComponent implements OnInit {
  // Control para visualizar mas o menos campos de b�squeda
  masCampos: boolean = false;
  
  jobs = new JobsPrincipal();
  grupo_soporte: string[] = ['Seleccione Grupo...', 'RA DISTRIBUIDOS', 'RA HOST', 'HERRAMIENTAS PRODUCCION', '...'];
  
  //TODO: Var de pruebas
  errorMessage: string;
  observableJobsPrincipal: Observable<JobsPrincipal[]>;
  jobsPrincipal: JobsPrincipal[];
  datos_tabla = new JobsPrincipal();
  data_simu_plano;
  data_simu =
  [
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 1,
    "cod_autouni": 2,
    "des_refdocjb": "CACB9302.html",
    "des_nombrjob": "CACB9302.sh",
    "des_gsoporte": "Imagen Cartera",
    "des_maqori": "apcar001",
    "des_libreori": "/pr/cacb/batch/es/scrt",
    "des_estrupl": "CACB",
    "des_periojob": "Se ejecutar&aacute; cuando llegue el fichero /pr/cacb/batch/es/dat/di/CAMARAP.txt,CICLICA 2 veces al dia. La periocidad ser&aacute; diaria. De octubre a Marzo: Lunes a S&aacute;bados. De Abril a Septiembre: Lunes a Viernes.",
    "des_maqeje": "apcar001",
    "xti_critijob": "C",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:37.437",
    "aud_timmodif": "2017-09-22 11:04:37.437",
    "des_desjobpl": "GRUPO DE SOPORTE: Imagen Cartera\n\nEste script lanza el binario cacbCrgFicCompP que realiza la carga del fichero de COMPENSACION PARA REPRESENTADOS con los datos de los documentos que se han de cruzar. Los datos de este fichero se insertan en la tabla TCACBFIC."
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 2,
    "cod_autouni": 3,
    "des_refdocjb": "CACB9303.html",
    "des_nombrjob": "CACB9303.sh",
    "des_gsoporte": "Imagen Cartera",
    "des_maqori": "apcar001",
    "des_libreori": "/pr/cacb/batch/es/scrt",
    "des_estrupl": "CACB",
    "des_periojob": "Se ejecutar&aacute; cuando llegue el fichero /pr/cacb/batch/es/dat/di/CAMARAD.txt. La periocidad ser&aacute; diaria. De octubre a Marzo: Lunes a S&aacute;bados. De Abril a Septiembre: Lunes a Viernes.",
    "des_maqeje": "apcar001",
    "xti_critijob": "C",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:37.584",
    "aud_timmodif": "2017-09-22 11:04:37.584",
    "des_desjobpl": "GRUPO DE SOPORTE: Imagen Cartera\n\nEste script lanza el binario cacbCrgFicCompD que realiza la carga del fichero de COMPENSACION DE REPRESENTADOS con los datos de los documentos que se han de cruzar. Los datos de este fichero se insertan en la tabla TCACBFIC."
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 3,
    "cod_autouni": 4,
    "des_refdocjb": "CACB9310.html",
    "des_nombrjob": "CACB9310.sh",
    "des_gsoporte": "Imagen Cartera",
    "des_maqori": "apcar001",
    "des_libreori": "/pr/cacb/batch/es/scrt",
    "des_estrupl": "CACB",
    "des_periojob": "Se ejecutar&aacute; a las 01:00 y sujeto a calendario, es decir, de octubre a marzo: Lunes a S&aacute;bados y de Abril a Septiembre: Lunes a Viernes. Teniendo en cuenta que no se ejecutar&aacute; los festivos nacionales y si los festivos no nacionales.",
    "des_maqeje": "apcar001",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:37.703",
    "aud_timmodif": "2017-09-22 11:04:37.703",
    "des_desjobpl": "GRUPO DE SOPORTE: Imagen Cartera\n\nEste script lanza el binario cacbBorComp, proceso que realiza el borrado de los datos obsoletos del Sistema."
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 4,
    "cod_autouni": 5,
    "des_refdocjb": "CACB9312.html",
    "des_nombrjob": "CACB9312.sh",
    "des_gsoporte": "Imagen Cartera",
    "des_maqori": "apcar001",
    "des_libreori": "/pr/cacb/batch/es/scrt",
    "des_estrupl": "CACB",
    "des_periojob": "Este script se ejecuta de forma autom&aacute;tica cuando se realiza la confirmaci&oacute;n de la transmisi&oacute;n correcta v&iacute;a XCOM del fichero de la compensaci&oacute;n BBVA.",
    "des_maqeje": "apcar001",
    "xti_critijob": "C",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:37.989",
    "aud_timmodif": "2017-09-22 11:04:37.989",
    "des_desjobpl": "GRUPO DE SOPORTE: Imagen Cartera\nScript que ejecuta el proceso cacbActEstDoc con el par&aacute;metro B, para confirmar la correcta transmisi&oacute;n a Host del fichero de cierre para la compensaci&oacute;n BBVA: CIERRE_BBVA.txt"
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 5,
    "cod_autouni": 6,
    "des_refdocjb": "CACB9313.html",
    "des_nombrjob": "CACB9313.sh",
    "des_gsoporte": "Imagen Cartera",
    "des_maqori": "apcar001",
    "des_libreori": "/pr/cacb/batch/es/scrt",
    "des_estrupl": "CACB",
    "des_periojob": "Este script se ejecuta de forma autom&aacute;tica cuando se realiza la confirmaci&oacute;n de la transmisi&oacute;n correcta v&iacute;a XCOM del fichero de la compensaci&oacute;n PARA REPRESENTADOS.",
    "des_maqeje": "apcar001",
    "xti_critijob": "C",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.08",
    "aud_timmodif": "2017-09-22 11:04:38.08",
    "des_desjobpl": "GRUPO DE SOPORTE: Imagen Cartera\n\nScript que ejecuta el proceso cacbActEstDoc con el par&aacute;metro P, para confirmar la correcta transmisi&oacute;n a Host del fichero de cierre para la compensaci&oacute;n PARA REPRESENTADOS: CIERRE_PARA.txt."
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 6,
    "cod_autouni": 7,
    "des_refdocjb": "CACB9700.html",
    "des_nombrjob": "CACBJ",
    "des_gsoporte": "ANS Imagen Cartera",
    "des_maqori": "ldftp102",
    "des_libreori": "",
    "des_estrupl": "",
    "des_periojob": "* De lunes a s&aacute;bado * De 07:00 a 20:00 * Frecuencia de ejecuci&oacute;n: cada 15 minutos.",
    "des_maqeje": "",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.148",
    "aud_timmodif": "2017-09-22 11:04:38.148",
    "des_desjobpl": "GRUPO DE SOPORTE: ANS Imagen Cartera\nScript que copia los ficheros procedentes de Graddo para las aplicaciones de Imagen Cartera:\n\nLas rutas de generaci&oacute;n de los lotes de digitalizaci&oacute;n de CACB en el nuevo Puente de Graddo son:\n\\DAT\\APPU\\PUENTE\\COMPEN1\\: se ha digitalizado el lote en la lecto 1\n\nLa digitalizaci&oacute;n de efectos de Compensaci&oacute;n imagen (CACB) genera lotes formados por los siguientes ficheros:\nNOMBRE_LOTE.idx\nNOMBRE_LOTE.rim\nNOMBRE_LOTE.fim\nNOMBRE_LOTE.eof\n\nEl script debe revisar que se ha generado el fichero NOMBRE_LOTE.eof en las rutas anteriormente indicadas para proceder a mover todos los ficheros, en el orden indicado. El fichero NOMBRE_LOTE.eof debe ser SIEMPRE el &uacute;ltimo en ser movido a AD003.\n\nLa ruta destino de los lotes de digitalizaci&oacute;n de CACB en AD003 es:\n/de/cacb/batch/es/dat/di/\n\n1. ALIAS_SERV: graddo_d GRADDO_D 2. REMOTE_PATH: \\DAT\\APPU\\PUENTE\\COMPEN1\\ 3. LOCAL_PATH: /de/cacb/batch/es/dat/di/ 4. TRANS_MODE: Binario 5. SUFIX_UTI_MID: sftp\n6. CIDX: LDFTP102_TO_AD003_B 7. GTW: ldftp102 8. GTWU: xtsftp1 9. REMOTE_DEL: SI"
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 7,
    "cod_autouni": 8,
    "des_refdocjb": "CACB9700_EI.html",
    "des_nombrjob": "CACBJ -",
    "des_gsoporte": "ANS Imagen Cartera",
    "des_maqori": "AD003",
    "des_libreori": "/de/gdep/batch/es/scrt/plsf9700_lpftp.sh",
    "des_estrupl": "",
    "des_periojob": "* De lunes a s&aacute;bado * De 07:00 a 20:00 * Frecuencia de ejecuci&oacute;n: cada 15 minutos.",
    "des_maqeje": "",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.197",
    "aud_timmodif": "2017-09-22 11:04:38.197",
    "des_desjobpl": "GRUPO DE SOPORTE: ANS Imagen Cartera\nScript que copia los ficheros procedentes de Graddo para las aplicaciones de Imagen Cartera:\n\nLas rutas de generaci&oacute;n de los lotes de digitalizaci&oacute;n de CACB en el nuevo Puente de Graddo son:\n\\DAT\\APPU\\PUENTE\\COMPEN1\\: se ha digitalizado el lote en la lecto 1\n\nLa digitalizaci&oacute;n de efectos de Compensaci&oacute;n imagen (CACB) genera lotes formados por los siguientes ficheros:\nNOMBRE_LOTE.idx\nNOMBRE_LOTE.rim\nNOMBRE_LOTE.fim\nNOMBRE_LOTE.eof\n\nEl script debe revisar que se ha generado el fichero NOMBRE_LOTE.eof en las rutas anteriormente indicadas para proceder a mover todos los ficheros, en el orden indicado. El fichero NOMBRE_LOTE.eof debe ser SIEMPRE el &uacute;ltimo en ser movido a AD003.\n\nLa ruta destino de los lotes de digitalizaci&oacute;n de CACB en AD003 es:\n/de/cacb/batch/es/dat/di/\n\n1. ALIAS_SERV: graddo_d GRADDO_D 2. REMOTE_PATH: \\DAT\\APPU\\PUENTE\\COMPEN1\\ 3. LOCAL_PATH: /de/cacb/batch/es/dat/di/ 4. TRANS_MODE: Binario 5. SUFIX_UTI_MID: sftp\n6. CIDX: LDFTP102_TO_AD003_B 7. GTW: ldftp102 8. GTWU: xtpru02 9. REMOTE_DEL: SI"
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 8,
    "cod_autouni": 9,
    "des_refdocjb": "CACB9701.html",
    "des_nombrjob": "CACBJ",
    "des_gsoporte": "ANS Imagen Cartera",
    "des_maqori": "ldftp102",
    "des_libreori": "",
    "des_estrupl": "",
    "des_periojob": "* De lunes a s&aacute;bado * De 07:00 a 20:00 * Frecuencia de ejecuci&oacute;n: cada 15 minutos.",
    "des_maqeje": "",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.241",
    "aud_timmodif": "2017-09-22 11:04:38.241",
    "des_desjobpl": "GRUPO DE SOPORTE: ANS Imagen Cartera\nScript que copia los ficheros procedentes de Graddo para las aplicaciones de Imagen Cartera:\n\nLas rutas de generaci&oacute;n de los lotes de digitalizaci&oacute;n de CACB en el nuevo Puente de Graddo son:\n\\DAT\\APPU\\PUENTE\\COMPEN2\\: se ha digitalizado el lote en la lecto 2\n\nLa digitalizaci&oacute;n de efectos de Compensaci&oacute;n imagen (CACB) genera lotes formados por los siguientes ficheros:\nNOMBRE_LOTE.idx\nNOMBRE_LOTE.rim\nNOMBRE_LOTE.fim\nNOMBRE_LOTE.eof\n\nEl script debe revisar que se ha generado el fichero NOMBRE_LOTE.eof en las rutas anteriormente indicadas para proceder a mover todos los ficheros, en el orden indicado. El fichero NOMBRE_LOTE.eof debe ser SIEMPRE el &uacute;ltimo en ser movido a AD003.\n\nLa ruta destino de los lotes de digitalizaci&oacute;n de CACB en AD003 es:\n/de/cacb/batch/es/dat/di/\n\n1. ALIAS_SERV: graddo_d GRADDO_D 2. REMOTE_PATH: \\DAT\\APPU\\PUENTE\\COMPEN2\\ 3. LOCAL_PATH: /de/cacb/batch/es/dat/di/ 4. TRANS_MODE: Binario 5. SUFIX_UTI_MID: sftp\n6. CIDX: LDFTP102_TO_AD003_B 7. GTW: ldftp102 8. GTWU: xtsftp1 9. REMOTE_DEL: SI"
  },
  {
    "cod_aplicaci": "CACB",
    "cod_jobpl": 9,
    "cod_autouni": 10,
    "des_refdocjb": "CACB9701_EI.html",
    "des_nombrjob": "CACBJ -",
    "des_gsoporte": "ANS Imagen Cartera",
    "des_maqori": "Ad003",
    "des_libreori": "/de/gdep/batch/es/scrt/plsf9700_lpftp.sh",
    "des_estrupl": "",
    "des_periojob": "* De lunes a s&aacute;bado * De 07:00 a 20:00 * Frecuencia de ejecuci&oacute;n: cada 15 minutos.",
    "des_maqeje": "",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.283",
    "aud_timmodif": "2017-09-22 11:04:38.283",
    "des_desjobpl": "GRUPO DE SOPORTE: ANS Imagen Cartera\nScript que copia los ficheros procedentes de Graddo para las aplicaciones de Imagen Cartera:\n\nLas rutas de generaci&oacute;n de los lotes de digitalizaci&oacute;n de CACB en el nuevo Puente de Graddo son:\n\\DAT\\APPU\\PUENTE\\COMPEN2\\: se ha digitalizado el lote en la lecto 2\n\nLa digitalizaci&oacute;n de efectos de Compensaci&oacute;n imagen (CACB) genera lotes formados por los siguientes ficheros:\nNOMBRE_LOTE.idx\nNOMBRE_LOTE.rim\nNOMBRE_LOTE.fim\nNOMBRE_LOTE.eof\n\nEl script debe revisar que se ha generado el fichero NOMBRE_LOTE.eof en las rutas anteriormente indicadas para proceder a mover todos los ficheros, en el orden indicado. El fichero NOMBRE_LOTE.eof debe ser SIEMPRE el &uacute;ltimo en ser movido a AD003.\n\nLa ruta destino de los lotes de digitalizaci&oacute;n de CACB en AD003 es:\n/de/cacb/batch/es/dat/di/\n\n1. ALIAS_SERV: graddo_d GRADDO_D 2. REMOTE_PATH: \\DAT\\APPU\\PUENTE\\COMPEN2\\ 3. LOCAL_PATH: /de/cacb/batch/es/dat/di/ 4. TRANS_MODE: Binario 5. SUFIX_UTI_MID: sftp\n6. CIDX: LDFTP102_TO_AD003_B 7. GTW: ldftp102 8. GTWU: xtpru02 9. REMOTE_DEL: SI"
  },
  {
    "cod_aplicaci": "DIME",
    "cod_jobpl": 1,
    "cod_autouni": 1,
    "des_refdocjb": "DIMEALGOD.doc",
    "des_nombrjob": "ejecuta.sh",
    "des_gsoporte": "Grupo Soporte",
    "des_maqori": "SDDBS101",
    "des_libreori": "Librer&iacute;a origen",
    "des_estrupl": "CADENA_APLICA",
    "des_periojob": "Diario de Martes a S&aacute;bado",
    "des_maqeje": "SIDBS101",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-18 13:51:52.187",
    "aud_timmodif": "2017-09-18 13:51:52.187",
    "des_desjobpl": "Descripci&oacute;n del Job"
  },
  {
    "cod_aplicaci": "EHRH",
    "cod_jobpl": 1,
    "cod_autouni": 11,
    "des_refdocjb": "EHRH5000_CA01A_UOG_0001D.html",
    "des_nombrjob": "ehrhcar1xd_uog.sh",
    "des_gsoporte": "DYD-AVANZA",
    "des_maqori": "HPDWC101",
    "des_libreori": "/${ENTORNO}/ehrh/batch/es/scrt/",
    "des_estrupl": "EHRH0001D",
    "des_periojob": "Diaria",
    "des_maqeje": "HPDWC101",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.335",
    "aud_timmodif": "2017-09-22 11:04:38.335",
    "des_desjobpl": "Grupo de soporte: DYD-AVANZA\n\nScript que ejecuta el workflow: wf_ehrh_X_D_Carga_UnidadOrganizativa\n\nehrhcom1xd_uog.sh <Entorno: (ei|pr)> Ejecuci&oacute;n del Script: /${ENTORNO}/ehrh/batch/es/scrt/\n\nDesarrollo de jobs (Autor): XE51860"
  },
  {
    "cod_aplicaci": "KETQ",
    "cod_jobpl": 1,
    "cod_autouni": 12,
    "des_refdocjb": "KETQ9375.html",
    "des_nombrjob": "KETQ9375.sh",
    "des_gsoporte": "es: GRUPO DE SOPORTE: ANS SOPORTE CUMPLIMIENTO NORMATIVO",
    "des_maqori": "lpaml001",
    "des_libreori": "/pr/ketq/batch/es/scrt",
    "des_estrupl": "KETQ000",
    "des_periojob": "Periodicidad: Diaria, no incluidos festivos",
    "des_maqeje": "",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.427",
    "aud_timmodif": "2017-09-22 11:04:38.427",
    "des_desjobpl": "1. A partir del fichero suministrado diariamente se actualiza la informaci&oacute;n de la tabla de Partys.\n2 Carga la informaci&oacute;n sobre los posibles errores que hayan podido producirse en la correspondiente tabla de Errores\n\nLa presencia de los ficheros en cuesti&oacute;n es obligatoria o el proceso fallar&aacute; y se parar&aacute;\n\nEl grupo Soporte es: GRUPO DE SOPORTE: ANS SOPORTE CUMPLIMIENTO NORMATIVO"
  },
  {
    "cod_aplicaci": "KETQ",
    "cod_jobpl": 2,
    "cod_autouni": 13,
    "des_refdocjb": "KETQ9440.html",
    "des_nombrjob": "KETQ9440.sh",
    "des_gsoporte": "es: GRUPO DE SOPORTE: ANS SOPORTE CUMPLIMIENTO NORMATIVO",
    "des_maqori": "lpaml001",
    "des_libreori": "/pr/ketq/batch/es/scrt",
    "des_estrupl": "KETQ000",
    "des_periojob": "Periodicidad: Diaria, no incluidos festivos",
    "des_maqeje": "",
    "xti_critijob": "C",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.657",
    "aud_timmodif": "2017-09-22 11:04:38.657",
    "des_desjobpl": "1Carga del fichero suministrado, mediante SAS Data Integration Studio, en la tabla de Especificaci&oacute;n de Par&aacute;metros.\n2 Carga la informaci&oacute;n sobre los posibles errores que hayan podido producirse en la correspondiente tabla de Errores\n3 La cadena de ejecuci&oacute;n debe ser, necesariamente,\n./KETQ9440.sh BBVA_SPEC_PARAM_DIM_yyyymmdd.csv\nSiendo yyyymmdd la fecha de los datos.\n\n\nLa presencia de los ficheros en cuesti&oacute;n es obligatoria o el proceso fallar&aacute; y se parar&aacute;\n\nEl grupo Soporte es: GRUPO DE SOPORTE: ANS SOPORTE CUMPLIMIENTO NORMATIVO"
  },
  {
    "cod_aplicaci": "KJID",
    "cod_jobpl": 1,
    "cod_autouni": 14,
    "des_refdocjb": "KJID9718.html",
    "des_nombrjob": "Env&iacute;o a Host",
    "des_gsoporte": "INFRAESTRUCTURA DE DIGITALIZACI&oacute;N",
    "des_maqori": "spnac004",
    "des_libreori": "",
    "des_estrupl": "",
    "des_periojob": "Todos los d&iacute;as [lunes � domingo] una vez por d&iacute;a, al encontrarse el fichero HOST_BORRALLINK.TXT en la ruta descrita.",
    "des_maqeje": "spnac004",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.72",
    "aud_timmodif": "2017-09-22 11:04:38.72",
    "des_desjobpl": "Se solicita enviar a Host el fichero HOST_BORRALLINK.TXT que se encuentre en la ruta /fichtemcomp/pr/nacar/kjid/ciclovida/out/ de la m&aacute;quina spnac004.\n\nLos datos del env&iacute;o a host son los siguientes:\nM&aacute;QUINA ORIGEN: spnac004\nM&aacute;QUINA DESTINO: TC02\nRECORD FORMAT: FB\nFICHERO REMOTO: EBPKJID.FTEBD05X.EJIDJ042.DOCRECI\nLRECL: 100\nBLKSIZE: 0\nREQUIERE ARRANCADOR: SI\nJCL: EJIDX042\nTIPO DE C&oacute;DIGO: EBCDIC\nMAXRECLEN: 5000\nTRUNCATION: NO\nALLOCATION TYPE: TRK\nPRIMARY ALLOCATION: 5\n\nSe desea que este proceso se realice una vez por d&iacute;a, una vez que haya finalizado el proceso descrito en el documento FORMU EX-005-03_Ejecuci&oacute;n script Borrado LiveLink_SPNAC004.doc; siempre y cuando exista el fichero HOST_BORRALLINK.TXT En la ruta /fichtemcomp/pr/nacar/kjid/ciclovida/out/\n\n\nGRUPO DE SOPORTE: INFRAESTRUCTURA DE DIGITALIZACI&oacute;N"
  },
  {
    "cod_aplicaci": "SLFR",
    "cod_jobpl": 1,
    "cod_autouni": 15,
    "des_refdocjb": "SLFR97203_FW.html",
    "des_nombrjob": "",
    "des_gsoporte": "ANTIFRAUD SYSTEMS",
    "des_maqori": "LPCCB001",
    "des_libreori": "",
    "des_estrupl": "SLFR9793",
    "des_periojob": "Diaria, a las 06:00 AM",
    "des_maqeje": "",
    "xti_critijob": "W",
    "aud_usuario": "XE29079",
    "aud_timcrea": "2017-09-22 11:04:38.775",
    "aud_timmodif": "2017-09-22 11:04:38.775",
    "des_desjobpl": "Necesitamos que gener&eacute;is un script que realice la transmisi&oacute;n desde el servidor origen lpccb001 hac&iacute;a el volumen de cargas que se encuentra en nuestro cluster de transmisiones con direcci&oacute;n 192.168.68.73. A continuaci&oacute;n adjunto todos los datos necesarios.\n\nSERVIDOR DE ORIGEN:\n\nM&aacute;quina: (10.40.62.28) lpccb001\nRuta del archivo: /usr/loca/pr/altavinculada\nFichero: AAAAMMDD_wac_ksgw.json\n\nSERVIDOR DESTINO:\n\nM&aacute;quina: (192.168.68.73) eslptrans001_ha\nRuta: /mnt/pdt/cargas/VIDEOLLAMADAS\nFichero: AAAAMMDD_wac_ksgw.json\n\nUna vez se haya copiado correctamente el fichero en el destino se tiene que borrar en el origen.\n\nEn el servidor destino hay que realizar la transmisi&oacute;n, incluso aunque el fichero en origen este vac&iacute;o y se realizar&aacute; un hist&oacute;rico del mismo ya que no tienen un tama&ntilde;o excesivo para ello se incluye ya en el formato o nombre del fichero las caracter&iacute;sticas de la fecha AAAA-MM-DD donde AAAA es el a&ntilde;o, MM es el mes y DD es el d&iacute;a todo del d&iacute;a de ejecuci&oacute;n se supone.\n\nEl usuario para el env&iacute;o ser&iacute;a xtslgi1.\n\nEl env&iacute;o tendr&iacute;a que ser con sftp.\n\nLa ejecuci&oacute;n del script tiene que ir encadenada al proceso AS/400 v&iacute;a XCOM que deposita el archivo en el servidor lpccb001 la cu&aacute;l seg&uacute;n tenemos informaci&oacute;n es el proceso Alta_Vinculada_Logs4 solicitado por otro equipo.\n\nSe solicita que si la ejecuci&oacute;n falla por no haber ficheros en el origen se habr&aacute; una incidencia v&iacute;a Remedy al equipo de Antifraud systems.\n\nGrupo de Soporte: ANTIFRAUD SYSTEMS\n\n\nPara cualquier duda pod&eacute;is contactar en el 44773 Mar&iacute;a G&oacute;mez Vasco."
  }
];
  //TODO: Var de pruebas - Fin
  
  //Variables del plugin Datatables
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";
  
  // Servicio a BBDD
  constructor(private bbddJobsService: BbddJobsService) {}
  
  ngOnInit() {
//    this.observableJobsPrincipal = this.bbddJobsService.getAllJobs();
//    this.observableJobsPrincipal.subscribe(
//      jobsPrincipal => this.jobsPrincipal = jobsPrincipal,
//      error =>  this.errorMessage = <any>error);

//    this.data_simu_plano = JSON.parse(this.data_simu); 
//    Object.assign({}, pasos1)
    
//    for (let data of this.data_simu) {
//      this.datos_tabla = <JobsPrincipal>data;
//      console.log("desde data: " + data.des_nombrjob);
//      console.log("desde datos_tabla.des_nombrjob: " + this.datos_tabla.des_nombrjob);
//    }
        
//    Object.assign(this.data_simu, this.jobsPrincipal);
//    
//    for (let data of this.jobsPrincipal) {
//      let job: JobsPrincipal = data;
//      console.log("Datos de los jobs: " + job.des_refdocjb);
//    }
    
  }
  
  //Metodo que modificara el booleano masCampos al valor contrario
  toogleCampos() {
    this.masCampos = !this.masCampos;
  }
  
  public onSubmit() {
    console.log('ha pulsado en submit: ' + JSON.stringify(this.jobs));
    
    this.observableJobsPrincipal = this.bbddJobsService.getAllJobs();
    this.observableJobsPrincipal.subscribe(
      jobsPrincipal => this.jobsPrincipal = jobsPrincipal,
      error =>  this.errorMessage = <any>error);
    
//    for (let job of this.jobsPrincipal) {
//      console.log("Los Jobs recuperados son: " + this.jobsPrincipal);
//    }
    
  }
  
  public limpiar() {
    console.log('Entra en metodo limpiar');    
    console.log("Los Jobs recuperados son: " + this.jobsPrincipal);
    this.jobs = new JobsPrincipal();
  }
}
