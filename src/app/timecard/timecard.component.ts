import { Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.css']
})

export class TimecardComponent implements OnInit {
displayedColumns: string[]=["Date","Hours","Reg","OTs","Unpaid","Amount"];


constructor(public bksvc:BackendService) {}
lastpos = { y: -1000, tab: -1 };

getperiod(p, m = () => {}) {
  if (this.bksvc.timecard[p] == undefined) {
    this.bksvc.sendcommand(
      f => {
        this.bksvc.timecard[p] = f;
        setTimeout(m, 10);
      },
      "GetEmployeeTimeCard",
      {
        id: this.bksvc.AMGSettings.Id,
        period: this.bksvc.AMGSettings.PayPeriodBackLimit-1-p
      }
    );
  } else m();
}


gototab(a) {
  const slider = document.getElementById("slider");
  const cpos = slider.scrollLeft;
  const swidth = Math.floor(slider.getBoundingClientRect().width);
  const currentslide = Math.round((cpos + a * swidth) / swidth);
  this.getperiod(
    this.bksvc.AMGSettings.PayPeriodBackLimit - 1 - currentslide,
    () => {
      slider.scrollLeft = cpos + a * swidth;
      slider.classList.remove("nosmooth");
      this.bksvc.scroll();
      setTimeout(() => {
        this.bksvc.scroll();
      }, 1500);
    }
  );
}


scroll1()
{
  const slider = document.getElementById("slider");
  const left = slider.scrollLeft;
  const width = slider.getBoundingClientRect().width;
  var a = Math.round(left / width);
  let selector = "#tbl" + a + ">tr";
  if (document.getElementById("tbl" + a) != null) {
    var pos =
      document.querySelector("mat-sidenav-content").scrollTop -
      document.getElementById("tbl" + a).offsetTop;
    document.querySelectorAll(selector + ">th").forEach(e => {
      var d = e as HTMLElement;
      if (pos > 0) d.style.top = pos + "px";
      else d.style.top = "0px";
    });

    if (pos < 0 && this.lastpos.y >= 0) {
      const first = document.querySelector(selector + ">th:first-child");
      const last = document.querySelector(selector + ">th:last-child");

      if (first != null) first.classList.remove("sticked1");
      if (last != null) last.classList.remove("sticked1");
    } else if (pos > 0 && this.lastpos.y <= 0) {
      const first = document.querySelector(selector + ">th:first-child");
      const last = document.querySelector(selector + ">th:last-child");

      if (first != null) first.classList.add("sticked1");
      if (last != null) last.classList.add("sticked1");
    }
  }
  this.lastpos.y = pos;
}



onResize() {
  this.lastpos.y = 0;
  const slider = document.getElementById("slider");
  const left = slider.scrollLeft;
  const width = slider.getBoundingClientRect().width;
  var a = Math.round(left / width);
  if (a != this.lastpos.tab) {
    this.getperiod(a);
    this.getperiod(a-1);
    this.scroll1();
    setTimeout(() => {
      this.bksvc.scroll();
    }, 100);
  } else this.lastpos.tab = a;
}


ngOnInit() {
  this.bksvc.heightadjustemnt()
  this.bksvc.loading=false;this.bksvc.timecard=[];
this.bksvc.timecard=new Array(this.bksvc.AMGSettings.PayPeriodBackLimit);
this.gototab(this.bksvc.AMGSettings.PayPeriodBackLimit-1)
}




  }
