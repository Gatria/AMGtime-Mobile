import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, CanActivate } from '@angular/router';
import {BackendService} from '../backend.service';


@Injectable()




export class AuthguardService implements CanActivate {
  constructor( private router: Router, private bksvc:BackendService) {}

canActivate(route,state): boolean { 
  
  
if (state.url=='/logout') {this.bksvc.logout(); return false;}

    if (!this.bksvc.loggedin) {
      
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }





}

