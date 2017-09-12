import { Routes, RouterModule } from '@angular/router';
import { IconosMenuComponent } from './iconos-menu/iconos-menu.component';
import { MenuOperacionComponent } from './menu-operacion/menu-operacion.component';
import { FormBuscaJobsComponent } from './form-busca-jobs/form-busca-jobs.component';
import { FormAltaJobsComponent } from './form-alta-jobs/form-alta-jobs.component';
import { FormBuscaCadenasComponent } from './form-busca-cadenas/form-busca-cadenas.component';
import { FormAltaCadenasComponent } from './form-alta-cadenas/form-alta-cadenas.component';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
  { path: '', redirectTo:'/iconos-menu', pathMatch: 'full'},
  { path: 'iconos-menu', component: IconosMenuComponent},
  { path: 'menu-operacion', component: MenuOperacionComponent},
  { path: 'form-busca-jobs', component: FormBuscaJobsComponent},
  { path: 'form-alta-jobs', component: FormAltaJobsComponent},
  { path: 'form-busca-cadenas', component: FormBuscaCadenasComponent},
  { path: 'form-alta-cadenas', component: FormAltaCadenasComponent},
  { path: '**', component: IconosMenuComponent}
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);