import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-userpunch',
  templateUrl: './userpunch.component.html',
  styleUrls: ['../statusboard/statusboard.component.scss'],
})
export class UserpunchComponent implements OnInit {
  constructor(public bksvc: BackendService) {}
  first = 0;
  myEmployee: any;
  JobDepartment: any;
  turn = false;
  title = [
    'Choose Employee',
    'Employee Punch',
    'Choose Action',
    'Camera',
    'Camera',
  ];
  ngOnInit() {
    this.bksvc.heightadjustemnt()
    this.scrollto(0);
  }

  scroll() {
    const slider = document.getElementById('slider');
    const left = slider.scrollLeft;
    const width = slider.getBoundingClientRect().width;
    this.first = Math.round(left / width);
    document.getElementById('title').innerHTML = this.title[this.first];
    setTimeout(() => {
      this.bksvc.scroll(this.bksvc.AMGSettings.IsEmployee ? 1 : 0);
    }, 100);
  }

  turning() {
    this.turn = true;
    setTimeout(() => {
      this.scrollto(2);
      setTimeout(() => {
        this.turn = false;
      }, 1000);
    }, 1000);
  }
  chooseemployee() {
    delete this.bksvc.action;
    if (this.bksvc.AMGSettings.IsEmployee) {
      this.bksvc.lastaction = this.bksvc.AMGSettings;
      this.bksvc.sendcommand(
        (f) => {
          this.bksvc.lastaction.PrevAction = f.PrevAction;

          this.bksvc.sendcommand(
            (e) => {
              this.bksvc.JobsAndDepartments = e;
              if (
                e.Tips.length > 0 &&
                this.bksvc.lastaction.DevActions[
                  this.bksvc.lastaction.DevActions.length - 1
                ].Value != 99
              )
                this.bksvc.lastaction.DevActions.push({
                  IntValue: 99,
                  StrValue: 'Enter Expenses',
                  TrValue: 'Enter Expenses',
                  Value: 99,
                });
              this.scrollto(1);
            },
            'GetJobsAndDepartments',
            { employeeId: this.myEmployee.Id }
          );
        },
        'GetEmployeeLastAction',
        { employeeId: this.myEmployee.Id, time: new Date().f1() }
      );
    } else {
      this.bksvc.sendcommand(
        (f) => {
          this.bksvc.lastaction = f;

          this.bksvc.sendcommand(
            (e) => {
              this.bksvc.JobsAndDepartments = e;
              this.scrollto(1);
            },
            'GetJobsAndDepartments',
            { employeeId: this.myEmployee.Id }
          );
        },
        'GetEmployeeLastAction',
        { employeeId: this.myEmployee.Id, time: new Date().f1() }
      );
    }
  }

  punch(a, b) {
    if (this.bksvc.ShowLogs) console.log(b);

    if (a == 0) {
      this.bksvc.action = b;
      delete this.bksvc.list;
      this.scrollto(4);
    }
    if (a == 1) {
      this.bksvc.action = b;
      delete this.bksvc.list;
      this.title[3] = this.title[4];
      if (b == 0) {
        this.bksvc.list = this.bksvc.JobsAndDepartments.Deps;
        this.title[3] = 'Choose Department';
      }
      if (b == 1) {
        this.bksvc.list = this.bksvc.JobsAndDepartments.Jobs;
        this.title[3] = 'Choose Job';
      }
      if (b == 99) {
        this.bksvc.list = this.bksvc.JobsAndDepartments.Tips;
        this.title[3] = 'Choose Category';
      }
      this.scrollto(3);
    }

    if (a == 2) {
      this.JobDepartment = b;
      this.scrollto(4);
    }
  }

  scrollto(a) {
    var v = 0;
    if (this.bksvc.AMGSettings.IsEmployee) {
      v = -1;
      if (a == 0) {
        this.myEmployee = this.bksvc.AMGSettings;

        this.chooseemployee();
        return false;
      }
    }

    if (a == 3 && (this.bksvc.list == undefined || this.bksvc.list.length < 2))
      if (this.first == 2 + v) {
        a = 4;
        if (this.bksvc.list != undefined)
          this.JobDepartment = this.bksvc.list[0].Code;
      } else if (this.first == 4 + v) a = 2;

    if (
      this.bksvc.lastaction != undefined &&
      !this.bksvc.lastaction.TakePictureOnPunch &&
      (a == 4 || (a == 3 && this.bksvc.list == undefined))
    ) {
      this.bksvc.transact(
        () => {
          this.chooseemployee();
        },
        this.bksvc.action,
        this.myEmployee.Id,
        this.JobDepartment
      );
      return true;
    }

    setTimeout(() => {
      document.querySelector('mat-sidenav-content').scrollTop = 0;
      const slider = document.getElementById('slider');
      const width = slider.getBoundingClientRect().width;
      slider.scrollLeft = width * (a + v);
    }, 100);
  }

  sendphoto(e) {
    this.bksvc.transact(
      () => {
        this.chooseemployee();
      },
      this.bksvc.action,
      this.myEmployee.Id,
      this.JobDepartment,
      e._imageAsDataUrl.replace('data:image/jpeg;base64,', '')
    );
  }
}
