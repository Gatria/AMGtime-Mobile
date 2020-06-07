
import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statusboard',
  templateUrl: './statusboard.component.html',
  styleUrls: ['./statusboard.component.scss']
})
export class StatusboardComponent implements OnInit {

  constructor(private bksvc:BackendService) { }
onResize() {
 this.views=[document.querySelector("mat-sidenav-container").clientWidth-20,0]; console.log(this.views);
}

  ngOnInit() {
    this.filter=31;
this.onResize();
this.single=[
  {
    "name": "Work",
    "value": 40632
   
  },
  {
    "name": "Out",
    "value": 50000
   
  },
  {
    "name": "Abscent",
    "value": 36745
   
  },
  {
    "name": "Lunch",
    "value": 36240
   
  },
  {
    "name": "Break",
    "value": 33000
   
  }
  
]
  

  this.colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };

let tt=this.bksvc.encript("true");
this.bksvc.sendcommand((f)=>{this.bksvc.StatusBoard=f},"GetStatusBoard","_in="+tt+"&_out="+tt+"&_lunch="+tt+"&_break="+tt+"&_absent="+tt+"&time="+this.bksvc.datetime())  
  }
filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}
chips(a) {
this.filter= this.filter ^ a;  
}



}