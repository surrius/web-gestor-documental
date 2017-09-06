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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormConsultaJobsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
