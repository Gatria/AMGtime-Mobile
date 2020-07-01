import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'


@Component({
  selector: 'app-timeoffuser',
  templateUrl: './timeoffuser.component.html',
  styleUrls: ['../timeoff/timeoff.component.css']
})
export class TimeoffuserComponent implements OnInit {

   constructor(private bksvc:BackendService) { }
first=true;
  ngOnInit() {
       this.filter=7;
       this.bksvc.cancel=[];
     this.bksvc.sendcommand((f)=>{ this.bksvc.timeofrequests=f;this.chips(0)},"GetTimeOffs",{date:new Date().f1()},{ withCredentials: true});
this.bksvc.loading=false
  }

scroll() {
 this.first= document.getElementById("slider").scrollLeft==0;
}

calculate ()
{
 this.bksvc.employeelist.forEach((b)=>{
  var a=0   
 this.bksvc.timeofrequests.forEach((e)=> {
if (e.From=="("+b.Code+") "+b.Name && ((this.filter % 4 >= 2 && e.Status==0) || (this.filter % 2 >= 1 && e.Status==1) || (this.filter % 8 >= 4 && e.Status==2))) a++
 }) 
 b.requescount=a;
 })
}

scrollto(a)
{

setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { } else {  }
} 

chips(a) {
      this.filter= this.filter ^ a;  
this.calculate()
}

}