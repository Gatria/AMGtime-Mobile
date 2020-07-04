import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-userpunch',
  templateUrl: './userpunch.component.html',
  styleUrls: ['./userpunch.component.css']
})
export class UserpunchComponent implements OnInit {

  constructor(private bksvc:BackendService) { }
first=true;
  ngOnInit() {
  }

scroll() {
 this.first= document.getElementById("slider").scrollLeft==0;
  this.bksvc.scroll()
}


scrollto(a)
{
console.log(this.myEmployee)
setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  

  if (a==1)  { } else {  }
} 

}