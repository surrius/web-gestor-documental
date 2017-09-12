import { Component, OnInit } from '@angular/core';

import { EnroutadorService } from '../services/enroutador.service';

@Component({
  selector: 'app-iconos-menu',
  templateUrl: './iconos-menu.component.html',
  styleUrls: ['./iconos-menu.component.css']
})
export class IconosMenuComponent implements OnInit {
  
  public documento: string;
  
  constructor(private data: EnroutadorService) { }
  
  ngOnInit() {
    this.data.currentDocumento.subscribe(documento => this.documento = documento);
  }

  selecciona(doc: string) {
    this.data.changeDocumento(doc);
  }
}
