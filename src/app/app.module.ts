//Librerias de Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';

import { routes } from './app.routes';
//Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Importamos el m�dulo http del paquete http de Angular
import { HttpModule, JsonpModule } from '@angular/http';

//Libreria Jquery para usarla en todo el proyecto
import * as $ from 'jquery';
//Libreria del plugin de Angular + Datatables
import {DataTableModule} from "angular2-datatable"; //quitar si no uso: quitar tambien la persistencia y angula-2-data-table de package.json

//Servicio de enrutamiento
import { EnroutadorService } from './services/enroutador.service';
//Servicios de comunicacion con la BBDD
import { BbddJobsService } from './services/bbdd-jobs.service';
import { BbddCadenasService } from './services/bbdd-cadenas.service';

//Componentes creados para el proyecto
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormAltaJobsComponent } from './form-alta-jobs/form-alta-jobs.component';
import { FormBuscaJobsComponent } from './form-busca-jobs/form-busca-jobs.component';
import { FormBuscaCadenasComponent } from './form-busca-cadenas/form-busca-cadenas.component';
import { FormAltaCadenasComponent } from './form-alta-cadenas/form-alta-cadenas.component';
import { MenuOperacionComponent } from './menu-operacion/menu-operacion.component';
import { IconosMenuComponent } from './iconos-menu/iconos-menu.component';
import { ConsultaJobsComponent } from './consulta-jobs/consulta-jobs.component';
import { ConsultaCadenasComponent } from './consulta-cadenas/consulta-cadenas.component';
import { FormBuscaAplicacionesComponent } from './form-busca-aplicaciones/form-busca-aplicaciones.component';
import { FormAltaAplicacionesComponent } from './form-alta-aplicaciones/form-alta-aplicaciones.component';
import { ConsultaAplicacionesComponent } from './consulta-aplicaciones/consulta-aplicaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormAltaJobsComponent,
    FormBuscaJobsComponent,
    FormBuscaCadenasComponent,
    FormAltaCadenasComponent,
    MenuOperacionComponent,
    IconosMenuComponent,
    ConsultaJobsComponent,
    ConsultaCadenasComponent,
    FormBuscaAplicacionesComponent,
    FormAltaAplicacionesComponent,
    ConsultaAplicacionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule     //quitar si no uso las datables
  ],
  providers: [
    EnroutadorService,
    BbddJobsService,
    BbddCadenasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
