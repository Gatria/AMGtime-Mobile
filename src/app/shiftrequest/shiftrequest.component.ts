import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-shiftrequest',
  templateUrl: './shiftrequest.component.html',
  styleUrls: ['../schedule/schedule.component.css'],
})
export class ShiftrequestComponent implements OnInit {
  filter = '';

  constructor(public bksvc: BackendService) {}

  ngOnInit() {
    this.bksvc.heightadjustemnt()
    this.bksvc.sendcommand((f) => {
      this.bksvc.ShiftRequest = f;
    }, 'GetOpenShiftRequests');
  }
  filterme(a, i) {
    //console.log(a,i);
    var d = a.EmployeeName;
    return d.toLowerCase().includes(i.toLowerCase());
  }
}
