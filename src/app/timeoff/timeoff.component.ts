import { Component, OnInit} from '@angular/core'
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.css']
})
export class TimeoffComponent implements OnInit,DoCheck{

  constructor(private bksvc:BackendService) { }
first=true;

  ngOnInit() {
       this.filter=7;
       this.bksvc.cancel=[];
     this.bksvc.sendcommand((f)=>{ this.bksvc.timeofrequests=f},"GetTimeOffs",{date:new Date().f1()},{ withCredentials: true});
this.reset_time_off_form()   
this.bksvc.loading=false
  }


scroll() {
 
 this.first= document.getElementById("slider").scrollLeft==0;
 if ( this.first) delete(this.AvailableWorkDays);
  this.bksvc.scroll() 
}

scrollto(a)
{

setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { 
    this.reset_time_off_form()     
  this.bksvc.sendcommand((f)=>{ this.bksvc.Categories=f},"GetCategoriesAndUsers");} else { delete(this.bksvc.timeofrequests); delete(this.bksvc.timeoff.AvailableWorkDays)
    this.bksvc.loading=false;
  this.bksvc.sendcommand((f)=>{this.bksvc.timeofrequests=f},"GetTimeOffs",{date:new Date().f1()},{ withCredentials: true});
  }
} 



reset_time_off_form ()
{
  const today = new Date()
  const dateobj = new Date(today)
  dateobj.setDate(dateobj.getDate() + 1)
  this.bksvc.timeoff.date=dateobj.toISOString();
     this.bksvc.timeoff.days="1"
     this.bksvc.timeoff.time=('0'+dateobj.getHours()).slice(-2)+":"+('0'+dateobj.getMinutes()).slice(-2)
     this.bksvc.timeoff.hours="1"
     this.bksvc.timeoff.dtype="1"
     this.bksvc.timeoff.comment=""
     this.bksvc.timeoff.category=null
 } 
change() {
setTimeout(()=>{

let fd=this.bksvc.timeoff.dtype==1
const m=new Date(this.bksvc.timeoff.date)
const s=("0" + (m.getMonth()+1)).slice(-2)+"/" + ("0" + m.getDate()).slice(-2) + "/" + m.getFullYear();
if (fd) s=s+" 00:00:00"; else s=s+" "+this.bksvc.timeoff.time; 
if (this.bksvc.timeoff.category!=null && this.bksvc.timeoff.days!=null && this.bksvc.timeoff.date!=null && (this.bksvc.timeoff.dtype==1 || (this.bksvc.timeoff.time!=null && this.bksvc.timeoff.hours!=null)) )  
this.bksvc.sendcommand((f)=>{ this.bksvc.timeoff.AvailableWorkDays=f},"GetEmployeeAvailableWorkDays",{start:s,days:this.bksvc.timeoff.days,hours:this.bksvc.timeoff.hours},{ withCredentials: true});
else delete(this.bksvc.timeoff.AvailableWorkDays)},100);
}


chips(a) {
          this.filter= this.filter ^ a;  
          }
}