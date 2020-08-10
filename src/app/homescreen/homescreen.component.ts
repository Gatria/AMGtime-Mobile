import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['../statusboard/statusboard.component.scss'],
})
export class HomescreenComponent implements OnInit {
  Sections=["Late Comers","Employee Current Statuses","Time Off Requests","Late Lunch"];

  constructor(public bksvc: BackendService, public router: Router) {}
  colorScheme = {
    domain: ['#0f7da2', '#C7B42C', '#c62828', '#AAAAAA', '#008266'],
  };
  single;



  ngOnInit() {
    this.bksvc.heightadjustemnt()
    this.bksvc.buildnavigation();
    this.bksvc.SummeryInfo = [];
    if (!this.bksvc.AMGSettings.IsEmployee) this.GetSummaryInfo();
  }
  GetSummaryInfo() {
    this.bksvc.sendcommand(
      (f) => {
        this.bksvc.SummeryInfo = f;
        this.bksvc.sendcommand((f)=>{this.bksvc.LateLunch=f},"GetLateLunches",{time:new Date().f1()});
        this.colorScheme.domain = ['#0f7da2', '#049275', '#c62828'];
        this.single = [
          {
            name: this.bksvc.SummeryInfo[2].Name,
            value: this.bksvc.SummeryInfo[2].Count,
          },
          {
            name: this.bksvc.SummeryInfo[3].Name,
            value: this.bksvc.SummeryInfo[3].Count,
          },
          {
            name: this.bksvc.SummeryInfo[1].Name,
            value: this.bksvc.SummeryInfo[4].Count,
          },
        ];
      },
      'GetSummaryInfo',
      { time: new Date().f1() }
    );
  }

  onSelect(event) {
    if (event.name == 'In') this.router.navigate(['/statusboard',{type:1}]);
    if (event.name == 'Out') this.router.navigate(['/statusboard',{type:2}]);
    if (event.name == 'Absences') this.router.navigate(['/statusboard',{type:3}]);
  }
}
