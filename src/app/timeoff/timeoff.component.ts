import { Component, OnInit } from '@angular/core'
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.css']
})
export class TimeoffComponent implements OnInit {

  constructor(private bksvc:BackendService) { }
first=true;
  ngOnInit() {
       this.filter=7;
     this.bksvc.sendcommand((f)=>{ this.bksvc.timeofrequests=f},"GetTimeOffs","date="+ this.bksvc.datetime(),{ withCredentials: true});
  }


scroll() {
 this.first= document.getElementById("slider").scrollLeft==0;
}

scrollto(a)
{

setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  this.bksvc.sendcommand((f)=>{ this.bksvc.Categories=f
  console.log(this.bksvc.Categories.Categories);
  },"GetCategoriesAndUsers");

}


chips(a) {
this.filter= this.filter ^ a;  
}
}