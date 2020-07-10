import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-openshift',
  templateUrl: './openshift.component.html',
  styleUrls: ['../schedule/schedule.component.css']
})
export class OpenshiftComponent implements OnInit {
  constructor(private bksvc:BackendService) { }
viewmode=0
  ngOnInit() {
    this.mydate=new Date();
    this.mydate.setHours(0,0,0);
    this.godate() 
  }



godate(a=0)
{
 if (a!==0) this.mydate=a;
this.bksvc.sendcommand((f)=>{this.bksvc.OpenShifts=f;},"GetOpenShifts",{date:this.mydate.f1(),viewMode:this.viewmode}) 
}
}
