
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

ngOnDestroy() {
  if (this.intervalid) {
    clearInterval(this.intervalid);
  }
}
  ngOnInit() {
    this.filter=31;

  

  this.colorScheme = {
    domain: ['#0f7da2', '#C7B42C', '#c62828 ', '#AAAAAA','#008266']
   };
this.intervalid=setInterval(()=>{
let tt=this.bksvc.encript("true");
this.bksvc.sendcommand((f)=>{this.bksvc.StatusBoard=f;this.recalculate()},"GetStatusBoard","_in="+tt+"&_out="+tt+"&_lunch="+tt+"&_break="+tt+"&_absent="+tt+"&time="+this.bksvc.datetime())},10000 ) 
  }
recalculate()
{



var work=0
var out=0
var abs=0
var lunch=0
var br=0

bksvc.StatusBoard.forEach((e)=>{
  if (e.Status=0 ) work++;
   if (e.Status=3 ) out++;
    if (e.Status=4 ) abs++;
     if (e.Status=1 ) lunch++;
      if (e.Status=2 ) br++;
})

.Status==1)|| (filter % 32 >= 16 && item.Status==2))">


this.single=[
  {
    "name": "Work",
    "value": work
   
  },
  {
    "name": "Out",
    "value": out
   
  },
  {
    "name": "Abscent",
    "value": abs
   
  },
  {
    "name": "Lunch",
    "value": lunch
   
  },
  {
    "name": "Break",
    "value": br
   
  }
  
]
}  
filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}
chips(a) {
this.filter= this.filter ^ a;  
}



}