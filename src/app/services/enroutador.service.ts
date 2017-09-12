import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EnroutadorService {

  // Variables de control para definir la ruta y configuracion como Observables
  private documento = new BehaviorSubject<string>('ninguno');
  private operacion = new BehaviorSubject<string>('ninguna');
  
  currentDocumento = this.documento.asObservable();
  currentOperacion = this.operacion.asObservable();
  
  constructor() { }
  
  // Metodo para modificar el documento
  changeDocumento(newDoc: string) {
    this.documento.next(newDoc);
  }
  
  // Metodo para modificar la operacion
  changeOperacion(newOpe: string) {
    this.operacion.next(newOpe);
  }

}
