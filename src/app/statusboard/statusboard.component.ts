
import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-statusboard',
  templateUrl: './statusboard.component.html',
  styleUrls: ['./statusboard.component.css']
})
export class StatusboardComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
    this.filter=31;
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