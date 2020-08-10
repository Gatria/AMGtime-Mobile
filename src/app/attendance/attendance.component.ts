import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['../timecard/timecard.component.css']
})
export class AttendanceComponent implements OnInit {

  first=0;
  period=0;
  myEmployee;
ngOnInit() {this.bksvc.heightadjustemnt()}

  constructor(public bksvc:BackendService) { }
scroll1()
{
  const slider = document.getElementById('slider');
  const left = slider.scrollLeft;
  const width= slider.getBoundingClientRect().width

    var a=Math.round(left/width);

  let selector="#tbl"+a+">tr";
    if (document.getElementById("tbl"+a)!=null) {
      var pos=document.querySelector("mat-sidenav-content").scrollTop-document.getElementById("tbl"+a).offsetTop;
      document.querySelectorAll(selector+">th").forEach((e) => {
        var d=(e as HTMLElement)
        if (pos>0) d.style.top=  pos+"px";
        else d.style.top= "0px";
        }
      )
}
const first= document.querySelector(selector+">th:first-child")
const last=document.querySelector(selector+">th:last-child")
  if (pos<0) {
    if (first!=null)  first.classList.remove('sticked1');
      if (last!=null)  last.classList.remove('sticked1');
    } else {
      if (first!=null)  first.classList.add('sticked1');
       if (last!=null) last.classList.add('sticked1');
    }
}


  scroll() {
    const title=["Attendance","Timecard","Schedule","Transactions","Misc. Entries","Benefits"];
    const slider = document.getElementById('slider');
    const left = slider.scrollLeft;
    const width= slider.getBoundingClientRect().width

    var a=Math.round(left/width);
    document.getElementById("title").innerHTML=title[a];
  this.first= a;
   setTimeout(() => {this.bksvc.scroll()}, 100);
}



getperiod(p)
{
 this.period+=p;
delete(this.bksvc.timecard);
this.bksvc.sendcommand((f)=>{this.bksvc.timecard=f; setTimeout(this.bksvc.scroll,100)} ,"GetTimeCard",{id:this.myEmployee.Id,period:this.period});


}


scrollto(a)
{
setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;
const slider = document.getElementById('slider');
const width= slider.getBoundingClientRect().width
slider.scrollLeft=width*a
},100);
}



}
