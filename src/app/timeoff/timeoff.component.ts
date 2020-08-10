import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.css'],
})
export class TimeoffComponent implements OnInit {
  constructor(public bksvc: BackendService) {}
  first = true;
  showDiv:any={};
  filter = 31;
  AvailableWorkDays: any;

  ngOnInit() {
    this.bksvc.heightadjustemnt()
    delete this.bksvc.timeofrequests;
    delete this.bksvc.timeoff.AvailableWorkDays;
    this.bksvc.cancel = [];
    this.bksvc.sendcommand(
      (f) => {
        this.bksvc.timeofrequests = f;
        this.chips(0);
        setTimeout(this.bksvc.scroll, 100);
      },
      'GetTimeOffs',
      { date: new Date().f1() },
      { withCredentials: true }
    );
    this.reset_time_off_form();
    this.bksvc.loading = false;
  }

  filterfn(e) {
    return e.requescount > 0;
  }

  scroll() {
    this.first = document.getElementById('slider').scrollLeft == 0;
    if (this.first) delete this.AvailableWorkDays;
    setTimeout(() => {this.bksvc.scroll()}, 100);
  }

  scrollto(a) {
    setTimeout(() => {
      const slider = document.getElementById('slider');
      const left = slider.scrollLeft;
      const width= slider.getBoundingClientRect().width


      document.querySelector('mat-sidenav-content').scrollTop = 0;
      slider.scrollLeft =  width * a;
    }, 100);

    if (a == 1) {
      this.reset_time_off_form();
      this.bksvc.sendcommand((f) => {
        this.bksvc.Categories = f;
      }, 'GetCategoriesAndUsers');
    } else this.ngOnInit();
  }

  reset_time_off_form() {
    const today = new Date();
    const dateobj = new Date(today);
    dateobj.setDate(dateobj.getDate() + 1);
    this.bksvc.timeoff.date = dateobj.toISOString();
    this.bksvc.timeoff.days = '1';
    this.bksvc.timeoff.time =
      ('0' + dateobj.getHours()).slice(-2) +
      ':' +
      ('0' + dateobj.getMinutes()).slice(-2);
    this.bksvc.timeoff.hours = '1';
    this.bksvc.timeoff.dtype = '1';
    this.bksvc.timeoff.comment = '';
    this.bksvc.timeoff.category = null;
  }
  change() {
    setTimeout(() => {
      let fd = this.bksvc.timeoff.dtype == 1;

      const m = new Date(this.bksvc.timeoff.date);
      var s =
        ('0' + (m.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + m.getDate()).slice(-2) +
        '/' +
        m.getFullYear();
      var tt = {};
      //if (fd) s=s+" 00:00:00"; else s=s+" "+this.bksvc.timeoff.time;
      if (!fd)
        tt = {
          hours: this.bksvc.timeoff.hours,
          start: s + ' ' + this.bksvc.timeoff.time,
        };
      else tt = { start: s + ' 00:00:00' };
      if (
        this.bksvc.timeoff.category != null &&
        this.bksvc.timeoff.days != null &&
        this.bksvc.timeoff.date != null &&
        (this.bksvc.timeoff.dtype == 1 ||
          (this.bksvc.timeoff.time != null && this.bksvc.timeoff.hours != null))
      )
        this.bksvc.sendcommand(
          (f) => {
            this.bksvc.timeoff.AvailableWorkDays = f;
            setTimeout(this.bksvc.scroll, 100);
          },
          'GetEmployeeAvailableWorkDays',
          Object.assign({ days: this.bksvc.timeoff.days }, tt)
        );
      else delete this.bksvc.timeoff.AvailableWorkDays;
    }, 100);
  }
  infocolapse(a=false)
  {

    setTimeout(this.bksvc.scroll, 100);
    return !a;
  }
  chips(a) {
    if (a == 31 && this.filter < 31) this.filter = 31;
    else if (a == 31) this.filter = 0;
    else this.filter = this.filter ^ a;

    if (this.filter == 31) document.getElementById('all').innerHTML = 'None';
    else document.getElementById('all').innerHTML = 'All';
    setTimeout(() => {
      this.bksvc.scroll();
    }, 1000);
  }
}
