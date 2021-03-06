import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
        state('normal', style({
          'background-color': 'red',
          transform: 'translateX(0)'
        })),
        state('highlighted', style({
          'background-color': 'blue',
          transform: 'translateX(100px)'
        })),
        transition('normal <=> highlighted', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ]),
  ]),
  trigger('list1', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(300)
    ]),
    transition('* => void', [
      animate(300, style({
        opacity: 0,
        transform: 'translateX(100px)'
      }))
    ]),
  ]),
  trigger('list2', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      animate(1000, keyframes([
        style({
          transform: 'translateX(-100px)',
          opacity: 0,
          offset: 0
        }),
        style({
          transform: 'translateX(-50px)',
          opacity: 0.5,
          offset: .3
        }),
        style({
          transform: 'translateX(-20px)',
          opacity: 1,
          offset: .8
        }),
        style({
          transform: 'translateX(0)',
          opacity: 1,
          offset: 1
        }),
      ]))
    ]),
    transition('* => void', [
      group([
        animate(300, style({
          color: 'red'
        })),
        animate(800, style({
          opacity: 0,
          transform: 'translateX(100px)'
        })),
      ])
    ]),
  ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.state === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    const index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }

  animatedStarted(event) {
    console.log(event);
  }

  animatedEnded(event) {
    console.log(event);
  }
}
