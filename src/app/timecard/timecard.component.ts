import { Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.css']
})

export class TimecardComponent implements OnInit {
displayedColumns: string[]=["Date","Hours","Reg","OTs","Unpaid","Amount"]; 


constructor(private bksvc:BackendService) {}


getperiod(p)
{
if (this.bksvc.timecard[p]==null) this.bksvc.sendcommand((f)=>{ 
//let tmp=f.Timecard.pop();
this.bksvc.timecard[p]=f;
//this.bksvc.timecard[p].Footer=tmp;
setTimeout(()=>{document.getElementById("slide"+p).classList.add("snap");this.onResize()},1000);
} ,"GetEmployeeTimeCard",{id:this.bksvc.AMGSettings.Id,period:this.bksvc.AMGSettings.PayPeriodBackLimit-1-p});


}


gototab(a)
{
let swidth=document.querySelector("div.slider").parentElement.clientWidth;
let cpos=document.querySelector("div.slider").scrollLeft;  
let currentslide=Math.round((cpos+a*swidth)/swidth);

document.getElementById("slide"+currentslide).classList.add("snap");  
setTimeout(()=>{document.querySelector("div.slider").scrollLeft=cpos+a*swidth},10);
}

onResize() {
var a=Math.round(document.querySelector("div.slider").scrollLeft/document.querySelector("div.slider").parentElement.clientWidth);
if (a>0) { this.getperiod(a);this.getperiod(a-1);}
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
 this.bksvc.scroll()
}

 

ngOnInit() {
  this.bksvc.loading=false;this.bksvc.timecard=[];
this.bksvc.timecard=new Array(this.bksvc.AMGSettings.PayPeriodBackLimit);
document.getElementById("slider").scrollLeft=document.getElementById("slider").clientWidth;
this.getperiod(this.bksvc.AMGSettings.PayPeriodBackLimit-1)
}

getRow(b) {
if (b!='') return 2; else return 1;
}

  
  }