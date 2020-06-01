import { Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service'
import { Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
name:string="testaccount@amgtime.com";
password:string="testaccount@amgtime.com1";

constructor(private bksvc:BackendService,private router: Router,public dialog: MatDialog) { }

ngOnInit() {
    if (this.router.url=="/toUser") this.login(2); 
    if (this.router.url=="/toEmp") this.login(1);
    if (this.router.url=="/login") this.bksvc.loggedin=false; 
  }

login(a = 0) {
  const b=["","switchToUser="+this.bksvc.encript("false"),"switchToUser="+this.bksvc.encript("true")];
  const c=[{withCredentials: false},{withCredentials: true},{withCredentials: true}]
  this.bksvc.sendcommand((f)=>{
        this.bksvc.AMGSettings=f;
        if (f.CanSwitchEmployee) {
          let dialogRef = this.dialog.open(EmployeeuserselectorComponent, {
            height: '80vh',
            width: '80vw',
          });
          dialogRef.afterClosed().subscribe(result => {
             if (result>0) this.login(result);
            });
        } else {     
        this.bksvc.loggedin=true;
          if (a==2) this.bksvc.sendcommand((f)=>{
              this.bksvc.employeelist=f;
              if (Array.isArray(f)) f.forEach(e => this.bksvc.codetoid[e.Code]=e.Id);
          },"GetEmployees")
        this.bksvc.buildnavigation();
        this.router.navigate(['/home']);}
  },"GetLoginNew",b[a]+"&name="+this.bksvc.encript(this.name)+"&password="+this.bksvc.encript(this.password)+"&time="+this.bksvc.datetime(),c[a]);
}


}



@Component({

  template: ' <button class="center round-corners" mat-flat-button [mat-dialog-close]="1" color="primary">Employee</button> <button class="center round-corners" mat-flat-button [mat-dialog-close]="2" color="primary">User</button>'

})
export class EmployeeuserselectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  


}