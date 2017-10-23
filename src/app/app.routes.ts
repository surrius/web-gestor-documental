import { Routes, RouterModule } from '@angular/router';
import { IconosMenuComponent } from './iconos-menu/iconos-menu.component';
import { MenuOperacionComponent } from './menu-operacion/menu-operacion.component';
import { FormBuscaJobsComponent } from './form-busca-jobs/form-busca-jobs.component';
import { FormAltaJobsComponent } from './form-alta-jobs/form-alta-jobs.component';
import { FormBuscaCadenasComponent } from './form-busca-cadenas/form-busca-cadenas.component';
import { FormAltaCadenasComponent } from './form-alta-cadenas/form-alta-cadenas.component';
import { FormBuscaAplicacionesComponent } from './form-busca-aplicaciones/form-busca-aplicaciones.component';
import { FormAltaAplicacionesComponent } from './form-alta-aplicaciones/form-alta-aplicaciones.component';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
  { path: '', redirectTo:'/iconos-menu', pathMatch: 'full'},
  { path: 'iconos-menu', component: IconosMenuComponent, data: { animation: 'iconos-menu' }},
  { path: 'menu-operacion', component: MenuOperacionComponent, data: { animation: 'menu-operacion' }},
  { path: 'form-busca-jobs', component: FormBuscaJobsComponent, data: { animation: 'form-busca-jobs' }},
  { path: 'form-alta-jobs', component: FormAltaJobsComponent, data: { animation: 'form-alta-jobs' }},
  /*{ path: 'form-alta-jobs/:id', component: FormAltaJobsComponent, data: { animation: 'form-alta-jobs/:id' }},*/
  { path: 'form-busca-cadenas', component: FormBuscaCadenasComponent, data: { animation: 'form-busca-cadenas' }},
  { path: 'form-alta-cadenas', component: FormAltaCadenasComponent, data: { animation: 'form-alta-cadenas' }},
  { path: 'form-busca-aplicaciones', component: FormBuscaAplicacionesComponent, data: { animation: 'form-busca-aplicaciones' }},
  { path: 'form-alta-aplicaciones', component: FormAltaAplicacionesComponent, data: { animation: 'form-alta-aplicaciones' }},
  { path: '**', component: IconosMenuComponent}
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);