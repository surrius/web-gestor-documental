import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { EnroutadorService } from '../services/enroutador.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            transform: 'translateX(-100%)'
          }),
          {optional:true}),
        // move page off screen right on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateX(100%)'
            })
          ),
        {optional:true}),
        // move page in screen from left to right
        query(':enter',
          animate('500ms ease',
            style({
              /*opacity: 1,*/
              transform: 'translateX(0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})

export class MenuComponent implements OnInit {
  errorMessage: string;
  
  info = {
    codUser: '',
    serverDate: '',
    localDate: '',
    entorno: ''
  };
  
  constructor( private data: EnroutadorService ) { }
  
  ngOnInit(): void {
//    this.datosGenerales();
//    TODO: Pruebas
      this.info.codUser = 'xe51933';
      this.info.serverDate = '02-02-2017 9:00';
      this.info.localDate = '02-02-2017 9:00';
      this.info.entorno = this.data.entorno;
//    TODO: Pruebas-fin
  }
  
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

  goTop() {
    window.scrollTo(0, 0);
    console.log("Host: " + window.location.host);
  }
  
  datosGenerales() {
    this.data.getDatosGenerales().subscribe(
      data => this.info = data,
      error => this.errorMessage = <any>error);
  }
    
}
