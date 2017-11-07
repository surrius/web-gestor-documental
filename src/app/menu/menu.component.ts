import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { EnroutadorService } from '../services/enroutador.service';
import {Observable} from 'rxjs/Rx';

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
    this.datosGenerales();
    //LLamada cada minuto
    Observable.interval(1000 * 60).subscribe(x => {
      this.datosGenerales();
    });
  }
  
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

  goTop() {
    window.scrollTo(0, 0);
    console.log("Host: " + window.location.host);
  }
  
  datosGenerales() {
    let fecha = new Date();
    this.info.localDate = fecha.toLocaleString();
    this.info.entorno = this.data.entorno;
    this.data.getDatosGenerales().subscribe(
      data => {
        this.info.codUser = data.usuario;
        this.info.serverDate = data.fecha;
      },
      error => this.errorMessage = <any>error);
  }
    
}
