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
  this.bksvc.sendcommand((f)=>{ this.bksvc.Categories=f},"GetCategoriesAndUsers");}

}

reset_time_off_form ()
{
  this.date="2020-08-04"
     this.days="1"
     this.time="01:01"
     this.hours="2"
     this.dtype="1"
     delete(this.category)
} 
change() {

if (this.days!=null && this.date!=null && (this.dtype==1 || (this.time!=null && this.hours!=null)) )  
this.bksvc.sendcommand((f)=>{ this.AvailableWorkDays=f},"GetEmployeeAvailableWorkDays","start="+ this.bksvc.datetime(this.date)+"&days="+this.bksvc.encript(""+this.days)+"&hours="+this.bksvc.encript(""+this.hours),{ withCredentials: true});
else delete(this.AvailableWorkDays)
}


chips(a) {
          this.filter= this.filter ^ a;  
          }
}