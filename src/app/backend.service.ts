import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageServiceModule } from 'ngx-webstorage-service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatDialog } from '@angular/material/dialog';

import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from './confirm-dialog/confirm-dialog.component';
import {
  EnterValueDialogComponent,
  EnterValueDialogModel,
} from './entervalue-dialog/entervalue-dialog.component';
import { Router } from '@angular/router';

@Injectable()
export class BackendService {
  tm = {
    t1: 'Confirm Action',
    t2: 'Do you really want to cancel time off request?',
    t3: 'Timecard Approved',
    t4: 'Do you really want to *** timecard?',
    t5: 'Timecard Rejected',
    i1: 'IP Address of Host Name',
    b2: 'No Benefit Found',
    f1: 'Are you sure you want to finish trip?',
    f2: 'Filter by Code or Name',
    l1: 'No Late Commers',
    l2: 'Notify employee for late lunch',
    l3: 'Notification sent',
    m1: 'Mileage covered: *** mile.\n Do you want to  save comment?',
    g1: 'Geo Location not supported',
    g2: 'Please alow location tracking',
    p1: 'Are you sure you want to pickup shift?',
    p4: 'Do you really want to perform *** action?',
    r1: 'Do you really want to reject timecard?',
    r2: 'Do you really want to reject open shift request?',
    r3: 'Open shift request rejected',
    a1: 'Confirm Amount',
    a2: 'Do you really want to approve timecard?',
    a3: 'Do you really want to approve open shift request?',
    a4: 'Open shift request approve',
    a5: 'Please Enter Expense',
    a6: 'No address available!',
    o1: 'You have no shift assigned',
    o3: 'Open shift pickup requested',
    o4: 'No Open Shifts',
    c2: 'Time off request was canceled',
    c3: 'Are you sure you want to cancel trip?',
    c4: 'Shift request was canceled',
    s1: 'Do you really want to cancel open shift request?',
    s2: 'Send Time Off Request?',
    s3: 'Service is Working',
    s4: 'Do you want swap the shifts?',
    s5: 'No Shift Requests',
    s6: 'Swap shift requested',
    d1: 'Are you sure you want to drop shift?',
    d2: 'Do you really want to logout ?',
    d3: 'Open shift droped requested',
    d4: 'No Documents Found',
    d5: 'Are you sure you want to cancel document ?',
    d6: 'Are you sure you want to decline signing ?',
  };
  AMGSettings: any = {};
  ShowLogs:boolean=false;
  StatusBoard: any;
  OpenShifts: any;
  LateComers: any;
  ShiftRequest: any;
  OpenShiftDate: any;
  SideNavigation = [];
  timecard: any = [];
  timeoff: any = {};
  Companies: any = [];
  cancel: any = [];
  SummeryInfo: any = [];
  touch: boolean;
  rememberme: boolean;
  loading: boolean;
  pushtoken: string;
  lastcall: any;
  LateLunch: any;
  currentslide: any;
  timeofrequests: any;
  Categories: any;
  loggedin: any;
  codetoid: any = {};
  empimage: any = {};
  name: string = '';
  password: string = '';
  url: string;
  employeelist: any;
  AdvancedScheduling: any;
  openshiftid: any;
  PunchAnalysis: any;
  JobsAndDepartments: any;
  currentDocument: any;
  location: any;
  lasttrip: any;
  schedulemode: any;
  CanSwitchEmployee: any;
  CompanyId: any;
  list: any;
  action: any;
  lastaction: any;
  defurl: string = 'https://3735.us/MobileService/';
  cookie: any = {};
  timeout:any;
  constructor(
    @Inject(LOCAL_STORAGE) public mystorage: StorageServiceModule,
    public data: HttpClient,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    public angularFireMessaging: AngularFireMessaging
  ) {}

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      if (this.ShowLogs) console.log('new message received. ', payload);
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        icon: '/assets/icons/Icon-1024x1024.png',
      };

      new Notification(notificationTitle, notificationOptions);
      //this.currentMessage.next(payload);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        if (this.ShowLogs) console.log(token);
        this.pushtoken = token;
        this.sendcommand((f) => {}, 'UpdateUserDeviceToken', {
          androidDevToken: token,
        });
      },
      (err) => {
        if (this.ShowLogs)
          console.log('Unable to get permission to notify.' + err);
      }
    );
  }

  public encript(value: string): string {
    let _key = CryptoJS.enc.Hex.parse('460b89c619206c92d38e8617f9052a56');
    let _iv = CryptoJS.enc.Hex.parse('0000000000000000');
    let encrypted = CryptoJS.AES.encrypt(value, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encodeURIComponent(encrypted.toString());
  }

  public buildnavigation() {
    this.SideNavigation = [];
    this.SideNavigation.push({
      icon: 'home',
      text: 'Home',
      action: '/home',
      footer: 'true',
    });
    if (this.AMGSettings.IsEmployee) {
      this.SideNavigation.push({
        icon: 'timecard',
        text: 'Timecard',
        action: '/timecard',
        footer: true,
      });
      if (this.AMGSettings.AdvancedScheduling)
        this.SideNavigation.push({
          icon: 'schedule',
          text: 'Schedule',
          action: '/schedule',
          footer: true,
        });
      if (this.AMGSettings.AdvancedScheduling)
        this.SideNavigation.push({
          icon: 'shift',
          text: 'Open Shifts',
          action: '/openshift',
          footer: false,
        });
      if (this.AMGSettings.AdvancedScheduling)
        this.SideNavigation.push({
          icon: 'shiftrequest',
          text: 'Shift Requests',
          action: '/shiftrequest',
          footer: false,
        });
      if (this.AMGSettings.Benefits)
        this.SideNavigation.push({
          icon: 'benefits',
          text: 'Benefits',
          action: '/benefit',
          footer: true,
        });
      if (this.AMGSettings.TimeOff)
        this.SideNavigation.push({
          icon: 'timeoffrequestevent',
          text: 'Time Off Requests',
          action: '/timeoff',
          footer: true,
        });
      if (this.AMGSettings.MileageTracking)
        this.SideNavigation.push({
          icon: 'tracking',
          text: 'Mileage Tracking',
          action: '/tracking',
          footer: false,
        });
      if (this.AMGSettings.Usigned)
        this.SideNavigation.push({
          icon: 'quill',
          text: 'USigned',
          action: '/usigned',
          footer: false,
        });
      if (this.CanSwitchEmployee)
        this.SideNavigation.push({
          icon: 'swap',
          text: 'Switch to User',
          action: '/toUser',
          footer: false,
        });
    } else {
      if (this.AMGSettings.Attendance)
        this.SideNavigation.push({
          icon: 'attendance',
          text: 'Attendance',
          action: '/attendance',
          footer: true,
        });
      if (this.AMGSettings.AdvancedScheduling)
        this.SideNavigation.push({
          icon: 'shift',
          text: 'Open Shifts',
          action: '/openshift',
        });
      if (this.AMGSettings.AdvancedScheduling)
        this.SideNavigation.push({
          icon: 'shiftrequest',
          text: 'Shift Requests',
          action: '/shiftrequest',
          footer: false,
        });
      if (this.AMGSettings.StatusBoard)
        this.SideNavigation.push({
          icon: 'statusboard',
          text: 'Status Board',
          action: '/statusboard',
          footer: true,
        });
      if (this.AMGSettings.PunchAnalysis)
        this.SideNavigation.push({
          icon: 'punchanalysis',
          text: 'Punch Analysis',
          action: '/punchanalysis',
          footer: true,
        });
      if (this.AMGSettings.TimeOff)
        this.SideNavigation.push({
          icon: 'timeoff',
          text: 'Time Off Requests',
          action: '/timeoffuser',
          footer: true,
        });
      if (this.AMGSettings.Usigned)
        this.SideNavigation.push({
          icon: 'quill',
          text: 'USigned',
          action: '/usigned',
          footer: false,
        });

      if (this.CanSwitchEmployee)
        this.SideNavigation.push({
          icon: 'swap',
          text: 'Switch to Employee',
          action: '/toEmp',
          footer: false,
        });
    }

    this.SideNavigation.push({
      icon: 'logout',
      text: 'Log Out',
      action: '/logout',
    });
  }

  heightadjustemnt()
  {
   if (window.innerHeight>window.innerWidth)
    setTimeout (()=>{(document.getElementsByClassName("mat-drawer-container")[0] as HTMLElement).style.height=window.innerHeight-window.innerWidth*0.14+"px"},3000);
  }
  stringtodate(a, t = 0) {
    let d = new Date(a.substr(0, 4), a.substr(4, 2) - 1, a.substr(6, 2));
    if (t == 0)
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    else return d;
  }

  showinfo(error: string) {
    if (error.trim()>"") {
    this._snackBar.open(error, 'X', {
      duration: 6000,
      panelClass: ['mat-accent-bg', 'shake'],
    });
  }
    //console.info(error)
    this.loading = false;
  }

  showerror(error) {
    if (error != undefined && error.trim()>"") {
      if (error.statusText != undefined) error = error.statusText;
      this._snackBar.open(error, 'X', {
        duration: 6000,
        panelClass: ['mat-warn-bg', 'shake'],
      });
    }
    //console.error(error)
    this.loading = false;
  }

  public sendcommand(
    f,
    command: string,
    postdata = {},
    httpOptions: any = { withCredentials: true }
  ): Observable<any> {
    if (this.ShowLogs) console.log(postdata);
    let hash = command + JSON.stringify(postdata);
    if (Array.isArray(f)) {
      var exit = f[1];
      f = f[0];
    }

    if (hash.search('time":') > 0)
      hash = hash.substring(1, hash.search('time":'));

    if (typeof postdata == 'object') {
      var s = '';

      Object.keys(postdata).forEach((key) => {
        if (command[0] == '*') s = s + '&' + key + '=' + postdata[key];
        else s = s + '&' + key + '=' + this.encript('' + postdata[key]);
      });
      postdata = s + '&cookie=' + JSON.stringify(this.cookie);
    }

    if (hash != this.lastcall) {
      this.lastcall = hash;

      if (command[0] == '*')
        var q =
          this.url.replace('MobileService', 'MobileApi') + command.substr(1);
      else var q = this.url + command;
      if (this.ShowLogs) console.log(q);
      let m = this.data.post(q, postdata, httpOptions);
      m.subscribe(
        (res) => {
          if (this.ShowLogs) console.log(res);
          this.lastcall = '';
          if (res instanceof Blob) f(res);
          else if (res[0]) {
            if (res[2] != undefined)
              this.cookie = Object.assign(this.cookie, res[2]);

            f(res[1]);
          } else {
            this.showerror(res[1]);
            if (typeof exit === 'function') exit();
          }
        },
        (error) => {
          this.lastcall = '';
          if (typeof exit === 'function') exit();
          this.showerror(error);
          if (this.ShowLogs) console.log(error);
        }
      );

      return m;
    }
  }

  scroll(e = 0) {
    const slider = document.getElementById('slider');
    const width = slider.getBoundingClientRect().width;
    const left = slider.scrollLeft;

    if (Math.abs(left / width - Math.round(left / width)) < 0.001) {
      this.currentslide = document.getElementById(
        'slide' + Math.round(left / width + e)
      );
     // console.log(Math.round(left / width + e), left, width);
      const footer = document.getElementById('footer');

      if (this.currentslide != undefined && !this.touch) {
        if (footer.clientWidth < width)
          var height = this.currentslide.clientHeight - -15 + 'px';
        else
          var height =
            this.currentslide.clientHeight - -footer.clientHeight + 'px';

        if (slider.style.height != height) {
         clearTimeout(this.timeout)
          this.timeout=setTimeout(() => {
            slider.style.height = height;
            slider.scrollLeft = left;
          }, 100);
        }
      }
    }
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.d2),
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.loggedin = false;
        this.cookie = {};
        this.RemoveVal('loginparam');
        this.RemoveVal('CanSwitchEmployee');
        this.RemoveVal('Companies');
        this.sendcommand(
          (f) => {
            this.router.navigate(['/login']);
          },
          'LogOut',
          { androidDeviceToken: this.pushtoken }
        );
      }
    });
  }

  ApproveOrDenyTimeOff(id, a) {
    const s = ['approve', 'deny'];
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        this.tm.t1,
        this.tm.t4.replace('***', s[a]),
        true
      ),
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.cancel[id] = 1;
        this.sendcommand(
         [ (f) => {
            delete this.cancel[id];
            this.timeofrequests = f;
          },()=>
        {delete this.cancel[id];
        }]
          ,
          'ApproveOrDenyTimeOff',
          { id: id, status: 1, approve: a == 0, comment: dialogResult }
        );
      }
    });
  }

  approverejecttimecard(i, s) {
    i = this.AMGSettings.PayPeriodBackLimit - i - 1;
    let comment = !s;
    let message = this.tm.r1;
    var code = 0;
    if (s) {
      message = this.tm.a2;
      code = 1;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, message, comment),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.loading = true;
        this.sendcommand(
          (f) => {
            this.showinfo(code == 0 ? this.tm.t5 : this.tm.t3);
            this.timecard[
              this.AMGSettings.PayPeriodBackLimit - 1 - i
            ].TimeCardApprovalStatus = code;
            this.loading = false;
          },
          'ApproveRejectTimecard',
          { period: i, approve: s, comment: dialogResult }
        );
      }
    });
  }

  transact(fun, b, EmployeeId, job, img = null) {
    var dialogRef;
    if (b == 99)
      dialogRef = this.dialog.open(EnterValueDialogComponent, {
        data: new EnterValueDialogModel(this.tm.a1, this.tm.a5),
      });
    else
      dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: new ConfirmDialogModel(
          this.tm.t1,
          this.tm.p4.replace(
            '***',
            this.lastaction.DevActions[
              this.lastaction.DevActions.findIndex((x) => x.Value === b)
            ].TrValue
          ),
          this.AMGSettings.Comments
        ),
      });
    var str = {};
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        var f = () => {
          if (this.location != undefined && b != 99)
            str = {
              latitude: this.location.latitude,
              longitude: this.location.longitude,
            };
          else str = {};
          if (img != null) str = Object.assign({ Image: img }, str);
          if (job != undefined && b != 99)
            str = Object.assign({ JobDep: job }, str);

          //AddExpense(string catCode, double amount, DateTime date, string image)

          if (b != 99)
            this.sendcommand(
              [
                (f) => {
                  this.showinfo(f.Message);
                  fun();
                },
                fun,
              ],
              'SetPunchAction5',
              Object.assign(
                { comment: dialogResult, action: b, employeeId: EmployeeId },
                str
              )
            );
          else
            this.sendcommand(
              [
                (f) => {
                  this.showinfo(f.Message);
                  fun();
                },
                fun,
              ],
              'AddExpense',
              Object.assign(
                { amount: dialogResult, catCode: job, date: new Date().f1() },
                str
              )
            );
        };
        this.getLocation(f);
      }
    });
  }

  sendtimeoffrequest(a) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.s2),
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        let fd = this.timeoff.dtype == 1;
        this.loading = true;
        this.sendcommand(
          (f) => {
            if (f == '') a.scrollto(0);
            else {
              const dialogData = new ConfirmDialogModel(
                this.tm.t1,
                f.DuplicateTimeOff
              );
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: dialogData,
              });

              dialogRef.afterClosed().subscribe((dialogResult) => {
                this.loading = false;
                if (dialogResult) {
                  this.cancel[a] = 1;
                  this.loading = true;
                  this.sendcommand(
                    (f) => {
                      a.scrollto(0);
                    },
                    'AddTimeOffRequests4',
                    {
                      CategoryId: this.timeoff.category,
                      forceAdd: true,
                      FullDay: fd.toString(),
                      Comment: this.timeoff.comment,
                      StartTime: this.timeoff.AvailableWorkDays.Schedules[0]
                        .DateTime,
                      JsonData: JSON.stringify(
                        this.timeoff.AvailableWorkDays.Schedules
                      ),
                    }
                  );
                }
              });
            }
          },
          'AddTimeOffRequests4',
          {
            CategoryId: this.timeoff.category,
            forceAdd: false,
            FullDay: fd.toString(),
            Comment: this.timeoff.comment,
            StartTime: this.timeoff.AvailableWorkDays.Schedules[0].DateTime,
            JsonData: JSON.stringify(this.timeoff.AvailableWorkDays.Schedules),
          }
        );
      }
    });
  }

  canceltimeoff(a) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.t2),
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.cancel[a] = 1;
        this.sendcommand(
          [
            (f) => {
              this.sendcommand(
                (f) => {
                  delete this.cancel[a];
                  this.showinfo(this.tm.c2);
                  this.timeofrequests = f;
                },
                'GetTimeOffs',
                { date: new Date().f1() },
                { withCredentials: true }
              );
            },
            (f) => {
              delete this.cancel[a];
            },
          ],

          'DeleteTimeOff',
          { id: a }
        );
      }
    });
  }

  CancelOpenShiftRequest(a, e) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.s1, true),
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.sendcommand(
          (f) => {
            this.showinfo(this.tm.c4);
            if (e !== undefined) e.ngOnInit();
          },
          'CancelOpenShiftRequest',
          { id: a, comment: dialogResult },
          { withCredentials: true }
        );
      }
    });
  }

  stringToHslColor(str, bk = false) {
    var hash = 0;
    var bkc;
    var col;

    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;

    if (bk) {
      bkc = 'none';
      col = 'hsl(' + h + ', ' + 50 + '%, ' + 50 + '%)';
    } else {
      bkc = 'hsl(' + h + ', ' + 60 + '%, ' + 85 + '%)';
      col = 'hsl(' + h + ', ' + 30 + '%, ' + 30 + '%)';
    }
    return { color: col, 'background-color': bkc };
  }

  DropOpenShift(id, e = undefined) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.d1, true),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.sendcommand(
          (f) => {
            this.showinfo(this.tm.d3);

            if (e !== undefined) e.ngOnInit();
          },
          'DropOpenShift',
          { id: id, comment: dialogResult }
        );
      }
    });
  }

  ApproveOpenShiftRequest(id, e) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.a3, true),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.sendcommand(
          (f) => {
            this.showinfo(this.tm.a4);

            if (e !== undefined) e.ngOnInit();
          },
          'ApproveOpenShiftRequest',
          { id: id, comment: dialogResult }
        );
      }
    });
  }

  RejectOpenShiftRequest(id, e) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.r2, true),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.sendcommand(
          (f) => {
            this.showinfo(this.tm.r3);

            if (e !== undefined) e.ngOnInit();
          },
          'RejectOpenShiftRequest',
          { id: id, comment: dialogResult }
        );
      }
    });
  }

  PickupOpenShift(id, e) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.p1, true),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult || typeof dialogResult == 'string') {
        this.sendcommand(
          (f) => {
            this.showinfo(this.tm.o3);
            if (e !== undefined) e.ngOnInit();
          },
          'PickupOpenShift',
          { id: id, comment: dialogResult }
        );
      }
    });
  }

  CancelTrip() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.c3),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.sendcommand(
          (f) => {
            this.sendcommand((f) => {
              this.lasttrip = f;
            }, 'GetLastIncompleteTrip');
          },
          'CancelTrip',
          { tripId: this.lasttrip.Id }
        );
      }
    });
  }

  EndTrip() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.f1),
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.getLocation(() => {
          this.sendcommand(
            (e) => {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: new ConfirmDialogModel(
                  this.tm.t1,
                  this.tm.m1.replace('***', e.Mileage),
                  true
                ),
              });
              dialogRef.afterClosed().subscribe((dialogResult) => {
                if (dialogResult || typeof dialogResult == 'string') {
                  this.sendcommand((f) => {}, 'ConfirmTripComment', {
                    miscId: e.MiscId,
                    comment: dialogResult,
                  });
                }
              });

              this.sendcommand((f) => {
                this.lasttrip = f;
              }, 'GetLastIncompleteTrip');
            },
            'ConfirmTripFinished',
            {
              date: new Date().f1(),
              tripId: this.lasttrip.Id,
              latitude: this.location.latitude,
              longitude: this.location.longitude,
            }
          );
        });
      }
    });
  }

  switchcomp(e) {
    this.CompanyId = e;
    this.router.navigate(['/toUser']);
  }

  swapshift(a, fb = () => {}) {
    if (this.schedulemode == 0) {
      this.schedulemode = 1;
      this.openshiftid = a;
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: new ConfirmDialogModel(this.tm.t1, this.tm.s4, true),
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult || typeof dialogResult == 'string') {
          this.sendcommand(
            (f) => {
              this.schedulemode = 0;
              delete this.openshiftid;
              this.showinfo(this.tm.s6);
              fb();
            },
            'SwapOpenShift',
            {
              openShiftId: this.openshiftid,
              swapOpenShiftId: a,
              comment: dialogResult,
            }
          );
        }
      });
    }
  }

  RemoveVal(a) {
    // @ts-ignore
    this.mystorage.remove(a);
  }
  SaveVal(a, b) {
    // @ts-ignore
    this.mystorage.set(a, b);
  }

  LoadVal(a, b) {
    // @ts-ignore
    var c = this.mystorage.get(a);
    if (c == undefined) return b;
    else return c;
  }

  getLocation(f = () => {}) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = position.coords;

          f();
        },
        () => {
          delete this.location;
          this.showerror(this.tm.g2);
          return false;
        }
      );
      return true;
    } else {
      this.showerror(this.tm.g1);
      return false;
    }
  }

  sendlate(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(this.tm.t1, this.tm.l2, false),
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.sendcommand(
          (f) => {
            this.showinfo(this.tm.l3);

          },
          'SendLateLunchNotificationToEmployee',
          { employeeId: id }
        );
      }
    });
  }

  getEmployees(y = () => {}) {
    this.sendcommand((f) => {
      this.employeelist = f;
      if (Array.isArray(f)) f.forEach((e) => (this.codetoid[e.Code] = e.Id));
      y();
      this.sendcommand(
        (e) => {
          if (Array.isArray(e))
            e.forEach((t) => {
              this.employeelist.forEach((z, i, p) => {
                if (z.Id == t.Id) p[i].canPunch = true;
              });
            });
        },
        'GetEmployees',
        { canPunch: true }
      );
    }, 'GetEmployees');
  }
}
