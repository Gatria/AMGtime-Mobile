import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-punchanalysis',
  templateUrl: './punchanalysis.component.html',
  styleUrls: ['./punchanalysis.component.scss']
})
export class PunchanalysisComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
   let tt=this.bksvc.encript("true");
this.bksvc.sendcommand((f)=>{this.bksvc.PunchAnalysis=f;},"GetPunchAnalyzis","&rounding="+tt+"&date="+this.bksvc.datetime("2020-04-04"))   
  }

filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}
}