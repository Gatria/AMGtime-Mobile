import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-latecomers',
  templateUrl: './latecomers.component.html',
  styleUrls: ['./latecomers.component.css']
})
export class LatecomersComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

ngOnInit() {
    this.mydate=new Date();

  }

godate(a=0)
{
 if (a!==0) this.mydate=a;delete(this.bksvc.LateComers);
this.bksvc.sendcommand((f)=>{this.bksvc.LateComers=f;},"GetLateComers",{date:this.mydate.f1(),rounding:true}) 
}
}