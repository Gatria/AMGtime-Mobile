import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
this.bksvc.sendcommand((f)=>{this.bksvc.lasttrip=f;},"GetLastIncompleteTrip") 
  this.lat=34.189849599999995;
  this.lng=-118.4513455;
  }




 starttrip()
 {
this.bksvc.getLocation(()=>{
this.bksvc.sendcommand((f)=>{this.bksvc.sendcommand((f)=>{this.bksvc.lasttrip=f;},"GetLastIncompleteTrip") },"AddTripLocation",{date:new Date().f1(),tripId:this.bksvc.lasttrip.Id,latitude:this.bksvc.location.latitude,longitude:this.bksvc.location.longitude}) 
 }) 
 } 

}