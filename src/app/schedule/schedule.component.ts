import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  set = [[0, 1], []];

  constructor(public bksvc: BackendService) {}
  viewmode = 0;
  mydate:any;
  ngOnInit() {
    this.bksvc.heightadjustemnt()
    this.bksvc.schedulemode = 0;
    this.mydate = new Date();
    this.mydate.setHours(0, 0, 0);
    this.godate();
  }
  swapshift(a) {
    this.bksvc.swapshift(a, () => {
      this.godate();
    });
  }
  godate(a = 0) {
    if (a !== 0) this.mydate = a;

    if (this.bksvc.schedulemode !== 0)
      this.bksvc.sendcommand(
        (f) => {
          this.bksvc.AdvancedScheduling = f;
        },
        'GetCoworkersDraftSchedules',
        { date: this.mydate.f1(), openShiftId: this.bksvc.openshiftid }
      );
    else
      this.bksvc.sendcommand(
        (f) => {
          this.bksvc.AdvancedScheduling = f;
        },
        'GetAdvancedScheduling',
        { date: this.mydate.f1(), viewMode: this.viewmode }
      );
  }
}
