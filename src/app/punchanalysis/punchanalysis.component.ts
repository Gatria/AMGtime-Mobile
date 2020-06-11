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
      this.filter=31;
      this.mydate=new Date();
      this.godate(0);

  }

godate(a)
{
  delete(this.bksvc.PunchAnalysis);
   var tomorrow = new Date();
    tomorrow.setDate(this.mydate.getDate() + a);
    this.mydate = tomorrow;

    let tt=this.bksvc.encript("true");
this.bksvc.sendcommand((f)=>{this.bksvc.PunchAnalysis=f;},"GetPunchAnalyzis","&rounding="+tt+"&date="+this.bksvc.datetime(this.mydate) )

}

filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}

chips(a) {
this.filter= this.filter ^ a; }


}