import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthguardService implements CanActivate {
  constructor(public router: Router, public bksvc: BackendService) {}

  canActivate(route, state): Observable<boolean> | boolean {

    if (document.getElementById("slider")!=undefined && state.url=="/timecard") document.getElementById("slider").remove()
    if (state.url == '/passwordreset') {
      let m = this.bksvc.sendcommand((f) => {}, 'ForgotPassword', {
        email: this.bksvc.name,
      });
      m.subscribe(
        (res) => {
          if (res[0]) this.router.navigate(['/passwordreset1']);
        },
        (error) => {
          return false;
        }
      );
      return m;
    } else if (state.url == '/logout') {
      this.bksvc.logout();
      return false;
    } else if (!this.bksvc.loggedin) {
      if (this.bksvc.LoadVal('lasturl', '') == state.url) {
        this.bksvc.url = this.bksvc.LoadVal('URL', this.bksvc.defurl);
        this.bksvc.CanSwitchEmployee = this.bksvc.LoadVal(
          'CanSwitchEmployee',
          false
        );
        this.bksvc.Companies = this.bksvc.LoadVal('Companies', []);
        this.bksvc.requestPermission();
        this.bksvc.receiveMessage();
        this.bksvc.showinfo('Refreshing Application');
        const loginparam = this.bksvc.LoadVal('loginparam', '');
        this.bksvc.sendcommand(
          (f) => {
            this.bksvc.AMGSettings = f;
            this.bksvc.loggedin = true;
            this.bksvc.buildnavigation();
            this.router.navigate([state.url]);
          },
          'GetLogin1',
          loginparam
        );
        this.bksvc.name = loginparam.name;
        this.bksvc.password = loginparam.password;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.bksvc.SaveVal('lasturl', state.url);
      return true;
    }
  }
}
