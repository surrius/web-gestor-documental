//Librerias de Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Libreria Jquery para usarla en todo el proyecto
import * as $ from 'jquery';

//Componentes creados para el proyecto
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormAltaJobsComponent } from './form-alta-jobs/form-alta-jobs.component';
import { FormBuscaJobsComponent } from './form-busca-jobs/form-busca-jobs.component';
import { FormBuscaCadenasComponent } from './form-busca-cadenas/form-busca-cadenas.component';
import { FormAltaCadenasComponent } from './form-alta-cadenas/form-alta-cadenas.component';
import { MenuOperacionComponent } from './menu-operacion/menu-operacion.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormAltaJobsComponent,
    FormBuscaJobsComponent,
    FormBuscaCadenasComponent,
    FormAltaCadenasComponent,
    MenuOperacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
