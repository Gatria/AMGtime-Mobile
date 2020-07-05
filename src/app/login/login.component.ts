import { Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service'
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


constructor(private bksvc:BackendService,private router: Router) { }

ngOnInit() {
this.show=false

if (this.router!=undefined) {
    if (this.router.url=="/toUser") this.login(2); 
    if (this.router.url=="/toEmp") this.login(1);
    if (this.router.url=="/login") this.bksvc.loggedin=false; }

  }


ValidateEmail(email:string) 
{
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



login(a = 0) {
  const b=[{},{switchToUser:false},{switchToUser:true}]
  const c=[{withCredentials: false},{withCredentials: true},{withCredentials: true}]
  this.bksvc.sendcommand((f)=>{
        this.bksvc.AMGSettings=f;
        if (f.CanSwitchEmployee) {
          this.show=true
        
        } else {     
        this.bksvc.loggedin=true;
          if (a==2) this.bksvc.sendcommand((f)=>{
              this.bksvc.employeelist=f;
              if (Array.isArray(f)) f.forEach(e => this.bksvc.codetoid[e.Code]=e.Id);
              this.bksvc.sendcommand((e)=>{
              if (Array.isArray(e)) e.forEach(e => {this.bksvc.employeelist.forEach(z=>{

              if (z.Id=e.Id) e.canPunch=true;  
              })});  
             console.log(this.bksvc.employeelist) },"GetEmployees",{canPunch:true})
          },"GetEmployees",{canPunch:false})
        this.bksvc.buildnavigation();
        this.router.navigate(['/home']);}
  },"GetLoginNew",Object.assign(b[a],{name:this.bksvc.name,password:this.bksvc.password,time:new Date().f1()}),c[a]);
}




}

