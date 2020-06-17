import { Component, OnInit } from '@angular/core'
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
     this.bksvc.sendcommand((f)=>{ this.bksvc.timeofrequests=f},"GetTimeOffs","date="+ this.bksvc.datetime(),{ withCredentials: true});
this.reset_time_off_form()   
  }


scroll() {
 
 this.first= document.getElementById("slider").scrollLeft==0;
 
 
 if ( this.first) delete(this.AvailableWorkDays); 
}

scrollto(a)
{

setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { 
    this.reset_time_off_form()     
  this.bksvc.sendcommand((f)=>{ this.bksvc.Categories=f},"GetCategoriesAndUsers");} else delete(this.bksvc.timeoff.AvailableWorkDays)

} 



reset_time_off_form ()
{
  var dateobj = new Date(); 
  this.bksvc.timeoff.date=dateobj.toISOString();
     this.bksvc.timeoff.days="1"
     this.bksvc.timeoff.time=('0'+dateobj.getHours()).slice(-2)+":"+('0'+dateobj.getMinutes()).slice(-2)
    console.log(this.bksvc.timeoff.time);
     this.bksvc.timeoff.hours="1"
     this.bksvc.timeoff.dtype="1"
     this.bksvc.timeoff.comment=""
     this.bksvc.timeoff.category=""
 } 
change() {

if (this.bksvc.timeoff.days!=null && this.bksvc.timeoff.date!=null && (this.bksvc.timeoff.dtype==1 || (this.bksvc.timeoff.time!=null && this.bksvc.timeoff.hours!=null)) )  
this.bksvc.sendcommand((f)=>{ this.bksvc.timeoff.AvailableWorkDays=f},"GetEmployeeAvailableWorkDays","start="+ this.bksvc.datetime(this.bksvc.timeoff.date)+"&days="+this.bksvc.encript(""+this.bksvc.timeoff.days)+"&hours="+this.bksvc.encript(""+this.bksvc.timeoff.hours),{ withCredentials: true});
else delete(this.bksvc.timeoff.AvailableWorkDays)
}


chips(a) {
          this.filter= this.filter ^ a;  
          }
}