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
   this.bksvc.getLocation(()=>{});
  }


mapReady() {
   this.getAddress(this.bksvc.location.latitude,this.bksvc.location.longitude);
}




getAddress( lat: number, lng: number ) {
    console.log('Finding Address');
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
        this.address=""
          if (result != null) {
            console.log(rsltAdrComponent)
           rsltAdrComponent.forEach((e)=>{
           if (e.types[0]!=="country" && e.types[0]!=="postal_code_suffix" && e.types[0]!=="administrative_area_level_2" && e.types[0]!=="locality" ) this.address =this.address+" "+e.short_name;
           })
          } else {
            this.bksvc.showerror('No address available!');
          }
        }
      });
  }
  }
 starttrip()
 {
this.bksvc.getLocation(()=>{
this.bksvc.sendcommand((f)=>{this.bksvc.sendcommand((f)=>{this.bksvc.lasttrip=f;},"GetLastIncompleteTrip") },"AddTripLocation",{date:new Date().f1(),tripId:this.bksvc.lasttrip.Id,latitude:this.bksvc.location.latitude,longitude:this.bksvc.location.longitude,AddressLine:this.address}) 
 }) 
 } 

}