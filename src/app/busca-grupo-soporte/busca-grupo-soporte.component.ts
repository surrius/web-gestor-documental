import { Component, OnInit, Input } from '@angular/core';

import { BbddJobsService } from '../services/bbdd-jobs.service';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-busca-grupo-soporte',
  templateUrl: './busca-grupo-soporte.component.html',
  styleUrls: ['./busca-grupo-soporte.component.css']
})
export class BuscaGrupoSoporteComponent implements OnInit {
  
  //Variables usadas para extraer el grupo de soporte del servidor
  public grupo_soporte_ob: Observable<string[]>;
  private searchTerms = new Subject<string>();

  // Variable que contendra el origen de la consulta
  public origen: string;

  // Variables asignadas a cada uno de los inputs que usen la búsqueda desde el componente padre
  public seleccion: string;
  public seleccionBusca: string;
  public seleccionMasiva: string;
  public seleccionAlta: string;

  constructor(
    private bbddJobsService: BbddJobsService,
  ) { }

  ngOnInit() {
    this.grupo_soporte_ob = this.searchTerms
      .debounceTime(400)        // Método que espera x ms antes de buscar los datos
      .distinctUntilChanged()   // Ignora el hacer la búsqueda si el resultado es el mismo
      .switchMap(term => term   // switch entre los observables cada vez que el parametro term cambie
                                // retorna el observable informado
        ? this.bbddJobsService.filtraGSoporte(term.toUpperCase())
                                // o vacio en caso de no encontrar nada
        : Observable.of<string[]>([]))
      .catch(error => {
        alert("Error al recuperar el Grupos de Soporte: " + error);
        return Observable.of<string[]>([]);
      });
  }
  
  // Se hace un Push en el observable
  search(term: string): void {
    this.searchTerms.next(term.toUpperCase());
  }
  
  // Se identifica el grupo de soporte seleccionado y se limpia el campo de búsqueda y
  // searchTerms con '' para que devuelva un observable vacio haciendo que el div desaparezca
  asigna(grupo: string, searchBox: HTMLInputElement) {
    switch (this.origen) {
      case "busca":
      this.seleccionBusca = grupo;
      break;
      case "masiva":
      this.seleccionMasiva = grupo;
      break;
      case "alta":
      this.seleccionAlta = grupo;
      break;       
    } 
    
    this.seleccion = grupo;

    searchBox.value = '';
    this.searchTerms.next('');
  }

}
