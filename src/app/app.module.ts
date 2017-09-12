//Librerias de Angular
import { routes } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Libreria Jquery para usarla en todo el proyecto
import * as $ from 'jquery';

//Servicio de enrutamiento
import { EnroutadorService } from './services/enroutador.service';

//Componentes creados para el proyecto
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormAltaJobsComponent } from './form-alta-jobs/form-alta-jobs.component';
import { FormBuscaJobsComponent } from './form-busca-jobs/form-busca-jobs.component';
import { FormBuscaCadenasComponent } from './form-busca-cadenas/form-busca-cadenas.component';
import { FormAltaCadenasComponent } from './form-alta-cadenas/form-alta-cadenas.component';
import { MenuOperacionComponent } from './menu-operacion/menu-operacion.component';
import { IconosMenuComponent } from './iconos-menu/iconos-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormAltaJobsComponent,
    FormBuscaJobsComponent,
    FormBuscaCadenasComponent,
    FormAltaCadenasComponent,
    MenuOperacionComponent,
    IconosMenuComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EnroutadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
