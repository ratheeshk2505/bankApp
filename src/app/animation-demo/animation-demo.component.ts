import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.css'],
  animations:[
    trigger('openClose',[
      state('open', style({
        width:"100%",
        height:"100px",
        backgroundColor:"yellow"
      })),
      state('close', style({
        width:"100%",
        height:"60px",
        backgroundColor:"grey"
      })),
      transition('open=>close', [
        animate('1s')
      ]),
      transition('close=>open', [
        animate('2s')
      ])
    ])
  ]
})
export class AnimationDemoComponent implements OnInit {
  isOpen=true;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.isOpen = !this.isOpen
  }

}
