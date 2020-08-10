import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeoffuser',
  templateUrl: './timeoffuser.component.html',
  styleUrls: ['../timeoff/timeoff.component.css'],
})
export class TimeoffuserComponent implements OnInit {
  filter;
  constructor(public bksvc: BackendService, public router: Router) {}
  first = true;
  myEmployee;
  showDiv: any = {};
  ngOnInit() {
    this.bksvc.heightadjustemnt()
    if (this.router.url == '/timeoffuser?type=2') this.filter = 2;
    else this.filter = 31;

    this.bksvc.cancel = [];
    this.bksvc.sendcommand(
      (f) => {
        this.bksvc.timeofrequests = f;
        this.chips(0);
      },
      'GetTimeOffs',
      { date: new Date().f1() },
      { withCredentials: true }
    );
    this.bksvc.loading = false;
  }

  scroll() {
    this.first = document.getElementById('slider').scrollLeft == 0;
    setTimeout(this.bksvc.scroll, 100);
  }
  infocolapse(a = false) {
    setTimeout(this.bksvc.scroll, 100);
    return !a;
  }
  calculate() {
    if (this.bksvc.employeelist != undefined)
      this.bksvc.employeelist.forEach((b) => {
        var a = 0;
        this.bksvc.timeofrequests.forEach((e) => {
          if (
            e.From == '(' + b.Code + ') ' + b.Name &&
            ((this.filter % 4 >= 2 && e.Status == 0) ||
              (this.filter % 2 >= 1 && e.Status == 1) ||
              (this.filter % 8 >= 4 && e.Status == 2))
          )
            a++;
        });
        b.requescount = a;
      });
      setTimeout(this.bksvc.scroll, 100);
  }

  scrollto(a) {
    if (this.bksvc.ShowLogs) console.log(this.myEmployee);
    setTimeout(() => {
      const slider = document.getElementById('slider');
      const width = slider.getBoundingClientRect().width;

      document.querySelector('mat-sidenav-content').scrollTop = 0;
      slider.scrollLeft = width * a;
    }, 100);
  }

  filterfn(e) {
    return e.requescount > 0;
  }

  chips(a) {
    if (a == 31 && this.filter < 31) this.filter = 31;
    else if (a == 31) this.filter = 0;
    else this.filter = this.filter ^ a;

    if (this.filter == 31) document.getElementById('all').innerHTML = 'None';
    else document.getElementById('all').innerHTML = 'All';
    this.calculate();
  }
}
