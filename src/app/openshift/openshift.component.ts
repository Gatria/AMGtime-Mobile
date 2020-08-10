import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-openshift',
  templateUrl: './openshift.component.html',
  styleUrls: ['../schedule/schedule.component.css'],
})
export class OpenshiftComponent implements OnInit {
  constructor(public bksvc: BackendService) {}
  viewmode = 0;
  mydate;
  ngOnInit() {
    this.bksvc.heightadjustemnt()
    if (this.bksvc.OpenShiftDate == undefined) this.mydate = new Date();
    else this.mydate = new Date(this.bksvc.OpenShiftDate);
    delete this.bksvc.OpenShiftDate;
    this.mydate.setHours(0, 0, 0);
    this.godate();
  }

  godate(a = 0) {
    if (a !== 0) this.mydate = a;
    this.bksvc.sendcommand(
      (f) => {
        this.bksvc.OpenShifts = f;
      },
      'GetOpenShifts',
      { date: this.mydate.f1(), viewMode: this.viewmode }
    );
  }
}
