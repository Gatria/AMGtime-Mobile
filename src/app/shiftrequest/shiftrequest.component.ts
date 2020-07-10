import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-shiftrequest',
  templateUrl: './shiftrequest.component.html',
  styleUrls: ['../schedule/schedule.component.css']
})
export class ShiftrequestComponent implements OnInit {


  constructor(private bksvc:BackendService) { }

  ngOnInit() {
   this.bksvc.sendcommand((f)=>{this.bksvc.ShiftRequest=f;},"GetOpenShiftRequests")  
  }


}