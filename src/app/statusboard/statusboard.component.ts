import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router} from '@angular/router';

@Component({
  selector: 'app-statusboard',
  templateUrl: './statusboard.component.html',
  styleUrls: ['./statusboard.component.scss']
})
export class StatusboardComponent implements OnInit {
hidegraph=false
  constructor(private bksvc:BackendService,private router: Router) { }

ngOnDestroy() {
  if (this.intervalid) {
    clearInterval(this.intervalid);
  }
}
  ngOnInit() {

 if (this.router.url=="/timeoffuser1") { this.filter=1; this.hidegraph=true} 
 else
 if (this.router.url=="/timeoffuser2") {this.filter=2; this.hidegraph=true}
 else
 if (this.router.url=="/timeoffuser3") {this.filter=4; this.hidegraph=true}
 else   this.filter=31;

  this.loaddata()
 
this.colorScheme={domain:['#0f7da2','#C7B42C','#c62828','#AAAAAA','#008266']}
this.intervalid=setInterval(()=>this.loaddata(),100000 ) 
  }

loaddata() {
this.bksvc.sendcommand((f)=>{this.bksvc.StatusBoard=f;this.recalculate()},"GetStatusBoard",{_in:true,_out:true,_lunch:true,_break:true,_absent:true,time:new Date().f1()})  
}

recalculate()
{



this.work=0
this.out=0
this.abs=0
this.lunch=0
this.br=0


this.bksvc.StatusBoard.forEach((e)=>{
  if (e.Status==0 ) this.work++; else
   if (e.Status==3 ) this.out++; else 
    if (e.Status==4 ) this.abs++; else 
     if (e.Status==1 ) this.lunch++; else 
      if (e.Status==2 ) this.br++; 
})

  

if (this.work+":"+this.out+":"+this.abs+":"+this.lunch+":"+this.br!=this.checksum)
{
this.single=[];
this.colorScheme.domain=[];
if (this.work>0) {this.colorScheme.domain.push('#0f7da2'); this.single.push({"name": "Work","value": this.work });}
if (this.out>0) {this.colorScheme.domain.push('#049275'); this.single.push({"name": "Out","value": this.out });}
if (this.abs>0) {this.colorScheme.domain.push('#c62828'); this.single.push({"name": "Absent","value": this.abs });}
if (this.lunch>0) {this.colorScheme.domain.push('#AAAAAA'); this.single.push({"name": "Lunch","value": this.lunch });}
if (this.br>0) {this.colorScheme.domain.push('#008266'); this.single.push({"name": "Break","value": this.br });}
  
}
this.checksum=this.work+":"+this.out+":"+this.abs+":"+this.lunch+":"+this.br
}  
filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}
chips(a) {
if ((this.work>0 && a==1) || (this.out>0 && a==2) || (this.abs>0 && a==4) || (this.lunch>0 && a==16) || (this.br>0 && a==32) || (a==31)) {
this.filter= this.filter ^ a; }

}



}