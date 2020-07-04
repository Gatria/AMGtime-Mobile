import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-timeoffuser',
  templateUrl: './timeoffuser.component.html',
  styleUrls: ['../timeoff/timeoff.component.css']
})
export class TimeoffuserComponent implements OnInit {

   constructor( private bksvc:BackendService,private router: Router) { }
first=true;
  ngOnInit() {
       if (this.router.url=="/timeoffuser2") this.filter=2; else   this.filter=31;
     


       this.bksvc.cancel=[];
     this.bksvc.sendcommand((f)=>{ this.bksvc.timeofrequests=f;this.chips(0)},"GetTimeOffs",{date:new Date().f1()},{ withCredentials: true});
this.bksvc.loading=false
  }

scroll() {
 this.first= document.getElementById("slider").scrollLeft==0;
  this.bksvc.scroll()
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
console.log(this.myEmployee)
setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { } else {  }
} 

filterfn(e)
{return e.requescount>0}

chips(a) {


    if (a==31 && this.filter<31)  
    this.filter=31
    else 
    if (a==31)
    this.filter=0;
    else
    this.filter= this.filter ^ a;  

if (this.filter==31) document.getElementById("all").innerHTML="None"; else document.getElementById("all").innerHTML="All";
this.calculate()

}
}