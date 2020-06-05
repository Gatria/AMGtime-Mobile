import { Component, OnInit } from '@angular/core'
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.css']
})
export class TimeoffComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
       this.filter=7;
     this.bksvc.sendcommand((f)=>{ this.timeofrequests=f},"GetTimeOffs","date="+ this.bksvc.datetime(),{ withCredentials: true});
  }
chips(a) {
this.filter= this.filter ^ a;  
}
}