import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';

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

export class MenuComponent {
	// change the animation state
	getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

  goTop() {
    window.scrollTo(0, 0);
    console.log("Host: " + window.location.host);
  }
    
}
