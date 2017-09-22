//Librerias de Angular
import { routes } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Importamos el m�dulo http del paquete http de Angular
import { HttpModule, JsonpModule } from '@angular/http';

//Libreria Jquery para usarla en todo el proyecto
import * as $ from 'jquery';

//Servicio de enrutamiento
import { EnroutadorService } from './services/enroutador.service';
//Servicio de comunicacion
import { ComunicacionService } from './services/comunicacion.service';

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
    ConsultaCadenasComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    EnroutadorService,
    ComunicacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
