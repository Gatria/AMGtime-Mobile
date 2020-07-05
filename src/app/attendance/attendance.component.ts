import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private bksvc:BackendService) { }
first=true;
  ngOnInit() {
      this.period=0;
  }

scroll() {
 this.first= document.getElementById("slider").scrollLeft==0;
  this.bksvc.scroll()
}



getperiod(p)
{
if (this.bksvc.timecard[p]==null) this.bksvc.sendcommand((f)=>{} ,"GetTimeCard",{id:this.myEmployee.Id,period:this.period});


}


scrollto(a)
{
console.log(this.myEmployee)
setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { } else {  }
} 



}