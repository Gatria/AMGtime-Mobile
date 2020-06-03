import { Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent,ConfirmDialogModel } from './confirm-dialog/confirm-dialog.component';
import { Router, CanActivate } from '@angular/router';
import { PunchdialogComponent } from './punchdialog/punchdialog.component';

@Injectable()
export class BackendService {
AMGSettings={}
timecard=[]
SummeryInfo=[]
loggedin=false
codetoid={}
empimage={}

url:string='https://3735.us/MobileService/';


 constructor(private data: HttpClient,public _snackBar: MatSnackBar,public dialog: MatDialog,private router: Router) { }
 private encript(value: string): string {
    let _key = CryptoJS.enc.Hex.parse("460b89c619206c92d38e8617f9052a56");
    let _iv = CryptoJS.enc.Hex.parse("0000000000000000");
    let encrypted = CryptoJS.AES.encrypt(
      value, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

  return encodeURIComponent(encrypted.toString());
 }

private buildnavigation()
{
this.SideNavigation=[]
this.SideNavigation.push({icon:"home", text:"Home", action:"/home",footer:"true"});
if (this.AMGSettings.IsEmployee) {

this.SideNavigation.push({icon:"timecard", text:"Timecard", action:"/timecard",footer:true});
this.SideNavigation.push({icon:"schedule", text:"Schedule", action:"/schedule",footer:true});
this.SideNavigation.push({icon:"shift", text:"Open Shifts", action:"/camera",footer:false});
this.SideNavigation.push({icon:"shiftrequest", text:"Shift Requests", action:"/logout",footer:false});
if (this.AMGSettings.Benefits) this.SideNavigation.push({icon:"benefits", text:"Benefits", action:"/benefit",footer:true});
this.SideNavigation.push({icon:"timeoffrequestevent", text:"Time Off Requests", action:"/timeoff",footer:true});
this.SideNavigation.push({icon:"tracking", text:"Mileage Tracking", action:"/timeoff",footer:false});
if (this.AMGSettings.Usigned) this.SideNavigation.push({icon:"usigned", text:"USigned", action:"/usigned",footer:false});
this.SideNavigation.push({icon:"swap", text:"Switch to User", action:"/toUser",footer:false});
} else
{
this.SideNavigation.push({icon:"attendance", text:"Attendance", action:"/login",footer:true});
this.SideNavigation.push({icon:"shift", text:"Open Shifts", action:"/login"});
this.SideNavigation.push({icon:"shiftrequest", text:"Shift Requests", action:"/logout",footer:false});
this.SideNavigation.push({icon:"statusboard", text:"Status Board", action:"/statusboard",footer:true});
this.SideNavigation.push({icon:"punchanalysis", text:"Punch Analysis", action:"/logout",footer:true});
this.SideNavigation.push({icon:"timeoffrequest", text:"Time Off Requests", action:"/timeoff",footer:true});
if (this.AMGSettings.Usigned) this.SideNavigation.push({icon:"usigned", text:"USigned", action:"/usigned",footer:false});
this.SideNavigation.push({icon:"swap", text:"Switch to Employee", action:"/toEmp",footer:false});

}

this.SideNavigation.push({icon:"logout", text:"Log Out", action:"/logout"});

} 




private showinfo (error:string) {
  this._snackBar.open( error, "", { duration: 6000, panelClass: [ 'mat-accent-bg'] });
  console.info(error)
}


private showerror (error:string) {
  this._snackBar.open( error, "", { duration: 6000, panelClass: ['mat-warn-bg'] });
  console.error(error)
}





public datetime():string {
  let m=new Date();
  return this.encript(m.getUTCFullYear() + "-" +
  ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
  ("0" + m.getUTCDate()).slice(-2) + " " +
  ("0" + m.getUTCHours()).slice(-2) + ":" +
  ("0" + m.getUTCMinutes()).slice(-2) + ":" +
  ("0" + m.getUTCSeconds()).slice(-2))
}

public sendcommand(f:function,command:string, postdata="", httpOptions={withCredentials: true})
{
let hash=command+postdata;  
if (hash.substring(1,hash.search("&time="))!=this.lastcall) {
this.lastcall=hash.substring(1,hash.search("&time="));
if (command[0]=="*") const q=this.url.replace("MobileService","MobileApi")+command.substr(1); else const q=this.url+command;
console.log(q) 
return this.data.post<any>(q, postdata, httpOptions).subscribe(
      res => {
        console.log(res);
        this.lastcall="";
        if (res instanceof Blob) f(res); 
        else 
        if (res[0]) { f(res[1]);  } else this.showerror(res[1])},
      error => {
        this.lastcall="";
        this.showerror( error)}
      )
}}



getEmpPhoto(id) {
this.sendcommand((f)=>{
 if (f.size>10) {
      var reader = new FileReader();
reader.readAsDataURL(f); 
reader.onloadend = ()=> {
this.empimage[id]= reader.result;
 }  } 
},"GetEmployeeImage","id="+this.encript('' +id),{ 
withCredentials: true, 
responseType:'blob' as 'json'
 });

}




punchmenu () {
    const dialogRef = this.dialog.open(PunchdialogComponent , {
      maxWidth: "400px",
      data: this
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
    });

}



logout () {
const message = "Do you really want to logout ?";
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
  if (dialogResult) { 
    this.router.navigate(['/login']);
  }
    });

}




















approverejecttimecard(i,s) {
  i=this.AMGSettings.PayPeriodBackLimit-i-1;
 let comment=false;
 let message= "Do you really want to reject timecard?"
if (s) message = "Do you really want to approve timecard?"
 else comment=true


    const dialogData = 
    new ConfirmDialogModel("Confirm Action", message ,comment);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

 dialogRef.afterClosed().subscribe(dialogResult => {
  if (dialogResult) { 
    console.log("Period:"+i+" "+s)
this.sendcommand((f)=>{},"ApproveRejectTimecard","period="+this.encript('' +i)+"&approve="+this.encript('' +s)+"&comment="
)


   }
    }); 
}















transact (b) {
const message = "Do you really want to perform "+b+" action ?";
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
  if (dialogResult) { 
var f=()=>{
if (this.location!=undefined)
var str="&latitude="+this.encript('' +this.location.latitude )+"&longitude="+this.encript('' +this.location.longitude); else var str="";
this.sendcommand((f)=>{this.showinfo(f.Message)},"SetPunchAction5","action="+this.encript('' +b)+"&employeeId="+this.encript('' +this.AMGSettings.Id)+str
)
}
this.getLocation(f)
   }
    });
    
}













getLocation(f) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
 this.location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  }
  f();
},()=>{delete(this.location);f()});
  return true } else {
    this.senderror("Geo Location not supported");
    return false;
  }
}
}