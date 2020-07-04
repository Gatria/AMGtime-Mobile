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
      this.godate();

  }
scroll(e) {
console.log(e)  
}
godate(a=0)
{
 if (a!==0) this.mydate=a;
delete(this.bksvc.PunchAnalysis);
this.bksvc.sendcommand((f)=>{this.bksvc.PunchAnalysis=f;this.chips(0)},"GetPunchAnalyzis",{rounding:true,date:this.mydate.f1()} )

}

filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}

chips(a) {


    if (a==31 && this.filter<31)  
    this.filter=31
    else 
    if (a==31)
    this.filter=0;
    else
    this.filter= this.filter ^ a;  

if (this.filter==31) document.getElementById("all").innerHTML="None"; else document.getElementById("all").innerHTML="All";


}


}