import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-latecomers',
  templateUrl: './latecomers.component.html',
   styleUrls: ['../punchanalysis/punchanalysis.component.scss']
})
export class LatecomersComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

ngOnInit() {
    this.mydate=new Date();
this.godate()
  }
filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}

godate(a=0)
{
 if (a!==0) this.mydate=a;delete(this.bksvc.LateComers);
this.bksvc.sendcommand((f)=>{this.bksvc.LateComers=f;},"GetLateComers",{date:this.mydate.f1(),rounding:true}) 
}
}