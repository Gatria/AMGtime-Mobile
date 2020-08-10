import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  a: any;
  show: boolean;
noscreen: boolean;
  loginparam = {};

  constructor(public bksvc: BackendService, public router: Router) {}

  ngOnInit() {
    this.show = false;
    this.noscreen=false
    if (this.router != undefined) {
      if (this.router.url=="/toUser") { this.login(2);this.noscreen=true}
      if (this.router.url=="/toEmp") { this.login(1);this.noscreen=true}

      if (this.router.url == '/login') {
        this.bksvc.url = this.bksvc.LoadVal('URL', this.bksvc.defurl);
        this.bksvc.rememberme = this.bksvc.LoadVal('rememberme', false);

        if (this.bksvc.rememberme && this.bksvc.loggedin == undefined) {
          this.bksvc.name = this.bksvc.LoadVal('username', '');
          this.bksvc.password = this.bksvc.LoadVal('password', '');
          this.login();
        }
      }
    }
  }

  ValidateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  login(a = 0) {
    const b = [{}, { switchToUser: false }, { switchToUser: true }];
    var tt = {};
    this.a = a;
    if (this.bksvc.CompanyId != undefined && a == 2) {
      tt = { companyId: this.bksvc.CompanyId };
    } else delete this.bksvc.CompanyId;

    this.loginparam = Object.assign(b[a], tt, {
      name: this.bksvc.name,
      password: this.bksvc.password,
      time: new Date().f1(),
    });

    this.bksvc.sendcommand(
      (f) => {
        if (f.Companies != undefined) {
          this.bksvc.Companies = f.Companies;
          this.bksvc.SaveVal('Companies', this.bksvc.Companies);
          if (this.bksvc.ShowLogs) console.log(this.bksvc.Companies);
        } else {
          this.bksvc.AMGSettings = f;
          this.bksvc.SaveVal('loginparam', this.loginparam);
          if (this.bksvc.rememberme) {
            this.bksvc.SaveVal('username', this.bksvc.name);
            this.bksvc.SaveVal('password', this.bksvc.password);
          } else {
            this.bksvc.RemoveVal('username');
            this.bksvc.RemoveVal('password');
          }

          this.bksvc.SaveVal('CanSwitchEmployee', this.bksvc.CanSwitchEmployee);

          if (f.CanSwitchEmployee) {
            this.show = true;
            this.bksvc.CanSwitchEmployee = true;
          } else {
            this.bksvc.loggedin = true;
          //  this.bksvc.requestPermission();
           // this.bksvc.receiveMessage();
            if (a == 2) this.bksvc.getEmployees();
            this.bksvc.buildnavigation();
            if (this.bksvc.AMGSettings.HasIncompleteTrip)
              this.router.navigate(['/tracking']);
            else this.router.navigate(['/home']);
          }
        }
      },
      'GetLogin1',
      this.loginparam
    );
  }

  switchcomp(a) {
    this.bksvc.CompanyId = a;
    this.login(2);
  }
}
