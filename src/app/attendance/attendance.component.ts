import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['../timecard/timecard.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private bksvc:BackendService) { }
first=0;
period=0;

  ngOnInit() {
  
  }

scroll() {
const title=["Attendance","Timecard","Schedule","Transactions","Misc. Entries","Benefits"];
 
var a=Math.round(document.querySelector("div.slider").scrollLeft/document.querySelector("div.slider").parentElement.clientWidth);
document.getElementById("title").innerHTML=title[a]; 
let selector="#tbl"+a+">tr";

if (document.getElementById("tbl"+a)!=null) {
var pos=document.querySelector("mat-sidenav-content").scrollTop-document.getElementById("tbl"+a).offsetTop;

  
 let f=document.querySelectorAll(selector+">th")
  f.forEach((d) => { 
  if (pos>0) d.style.top=  pos+"px"; else d.style.top= 0; 
   });   
if (pos<0) {


  document.querySelector(selector+">th:first-child").classList.remove('sticked1');
   document.querySelector(selector+">th:last-child").classList.remove('sticked1');
} else {
document.querySelector(selector+">th:first-child").classList.add('sticked1');
document.querySelector(selector+">th:last-child").classList.add('sticked1');

}


} 
 this.first= a;
  this.bksvc.scroll()
}



getperiod(p)
{
 this.period+=p; 
delete(this.bksvc.timecard); 
this.bksvc.sendcommand((f)=>{this.bksvc.timecard=f; setTimeout(this.bksvc.scroll,100)} ,"GetTimeCard",{id:this.myEmployee.Id,period:this.period});


}


scrollto(a)
{
console.log(this.myEmployee)
setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { } else {  }
} 



}