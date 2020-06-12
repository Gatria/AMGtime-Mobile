import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, CanActivate } from '@angular/router';
import {BackendService} from '../backend.service';


@Injectable()




export class AuthguardService implements CanActivate {
  constructor( private router: Router, private bksvc:BackendService) {}




canActivate(route,state): Observable <boolean> | boolean { 
if (state.url=='/passwordreset') {
  let m=this.bksvc.sendcommand((f)=>{},"ForgotPassword","email="+this.bksvc.encript(this.bksvc.name));
 m.subscribe(
res => {
 if (res[0])   this.router.navigate(['/passwordreset1']);
 },
error => {return false}
  )
  return m
  }

 else
if (state.url=='/logout') {this.bksvc.logout(); return false;}
else
    if (!this.bksvc.loggedin) {
      
      this.router.navigate(['/login']);
      return false;
    } else     
    return true;
  }





}

