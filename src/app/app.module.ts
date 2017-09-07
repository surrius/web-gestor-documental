//Librerias de Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//Libreria Jquery para usarla en todo el proyecto
import * as $ from 'jquery';

//Componentes creados para el proyecto
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormConsultaJobsComponent } from './form-consulta-jobs/form-consulta-jobs.component';
import { FormAltaJobsComponent } from './form-alta-jobs/form-alta-jobs.component';
import { FormBuscaJobsComponent } from './form-busca-jobs/form-busca-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormConsultaJobsComponent,
    FormAltaJobsComponent,
    FormBuscaJobsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
