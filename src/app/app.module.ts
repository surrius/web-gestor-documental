import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//Libreria Jquery para usarla en todo el proyecto
import * as $ from 'jquery';
import { MenuComponent } from './menu/menu.component';
import { FormConsultaJobsComponent } from './form-consulta-jobs/form-consulta-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormConsultaJobsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
